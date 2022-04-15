import classNames from 'classnames';
import React, { ChangeEvent, FC, memo, MouseEvent, useMemo, useRef } from 'react';
import axios from 'axios';
import { UploadFile, UploadStatus } from './interface';
import FileList from './fileList/FileList';
import { getBase64, getUid, verifyMIME } from './utils';
import useStateFromProp from './useStateFromProps';
import Dragger from './Dragger';
import { isEmptyArray } from '../../utils';

interface OnChangeEvent {
  file: UploadFile;
  fileList?: UploadFile[];
}

interface ResponseData {
  url: string;
  [key: string]: any;
}

export interface UploadProps {
  /** 上传地址 */
  action?: string;
  /** 可选的文件类型 */
  accept?: string;
  /** 文件是否多选 */
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  /** 展示的file文件 */
  fileList?: UploadFile[];
  /** 最大文件选择数目 */
  maxCount?: number;
  /** 文件展示类型 */
  listType?: 'picture' | 'text';
  /** 超出最大选择文件数时的回调 */
  onCountExceed?: (exceed: number) => void;
  /** 自定义请求方法 */
  customRequest?: (formData: FormData) => Promise<ResponseData>;
  onChange?: (e: OnChangeEvent) => void;
  /** 返回 false 会中断上传 */
  beforeUpload?: (fileList: File[]) => File[] | Promise<File[]> | boolean;
}

const cls = 'alan-upload';

export const Upload: FC<UploadProps> = ({
  children,
  accept = 'image/*',
  multiple,
  disabled,
  action = 'https://run.mocky.io/v3/69430982-338a-4fda-9a8b-f5cb9c789146',
  maxCount = 6,
  fileList = [],
  listType = 'picture',
  className,
  beforeUpload,
  onChange,
  onCountExceed,
  customRequest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldUploadRef = useRef(true);

  useMemo(() => {
    // 初始化时添加uid和status
    fileList.forEach((file) => {
      if (!file.uid) {
        // eslint-disable-next-line no-param-reassign
        file.uid = getUid();
      }
      if (!file.status) {
        // eslint-disable-next-line no-param-reassign
        file.status = UploadStatus.DONE;
      }
    });
  }, [fileList]);

  const [internalFileList, setInternalFileList] = useStateFromProp(fileList);
  const showAdd = useMemo(() => internalFileList.length < maxCount, [internalFileList, maxCount]);

  const post = async (currentTask: UploadFile): Promise<ResponseData> => {
    const formData = new FormData();
    const { rawFile } = currentTask;
    if (!rawFile) throw new Error('no rawFile');

    formData.append(rawFile.name, rawFile);
    let data: ResponseData;

    if (customRequest) {
      data = await customRequest(formData);
    } else {
      const res = await axios.post(action, formData, {
        onUploadProgress: (e: ProgressEvent) => {
          updateStatus(currentTask, {
            status: UploadStatus.UPLOADING,
            percent: Math.round((e.loaded * 100) / e.total)
          });
        }
      });
      data = res.data;
    }

    return data;
  };

  const updateStatus = (
    currentTask: UploadFile,
    info: { status?: string; url?: string | ArrayBuffer; percent?: number }
  ) => {
    let newFileList: UploadFile[] = [];
    let currentFile = {};

    setInternalFileList((prev) => {
      newFileList = prev.map((task) => {
        if (task.uid !== currentTask.uid) return task;

        currentFile = {
          ...task,
          name: currentTask.rawFile?.name,
          uid: currentTask.uid,
          ...info
        };
        return currentFile;
      });
      return newFileList;
    });

    onChange?.({ file: { ...currentFile, rawFile: currentTask.rawFile }, fileList: newFileList });
  };

  const upload = async (tasks: UploadFile[]) => {
    // 中断上传
    if (!shouldUploadRef.current) {
      tasks.map(async (currentTask) => {
        let previewImage: string | ArrayBuffer = '';
        if (accept === 'image/*') {
          previewImage = (await getBase64(currentTask.rawFile as File)) || '';
        }

        updateStatus(currentTask, { status: UploadStatus.CANCELED, url: previewImage });
      });
      return;
    }

    await Promise.all(
      tasks.map(async (currentTask) => {
        try {
          const result = await post(currentTask);
          updateStatus(currentTask, { status: UploadStatus.DONE, url: result.url });
          alert(`${currentTask.rawFile?.name} success!`);
        } catch (e) {
          updateStatus(currentTask, { status: UploadStatus.ERROR, url: '' });
          alert(`${currentTask.rawFile?.name} failed!`);
          throw e;
        }
      })
    ).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  };

  const isCountExceed = (len: number) => {
    const count = len + internalFileList.length;
    if (count <= maxCount) return false;
    if (onCountExceed) {
      onCountExceed(count);
    }
    return true;
  };

  const handleVerifiedFiles = (files: File[]) => {
    const verifiedFiles: File[] = [];
    files.forEach((item) => {
      if (verifyMIME(item, accept)) {
        verifiedFiles.push(item);
      } else {
        alert('Select the correct format file');
      }
    });

    return verifiedFiles;
  };

  const handleUploadTasks = async (files: File[]) => {
    let handledFiles = files;
    if (beforeUpload) {
      const shouldUpload = await beforeUpload(files);
      if (shouldUpload) {
        handledFiles = shouldUpload as File[];
      } else {
        shouldUploadRef.current = false;
      }
    }

    // 添加状态
    const newTasks: UploadFile[] = handledFiles.map((file) => ({
      uid: getUid(),
      status: UploadStatus.UPLOADING,
      name: file.name,
      rawFile: file
    }));

    if (!isCountExceed(newTasks.length)) {
      setInternalFileList((prev) => [...prev, ...newTasks]);
      await upload(newTasks);
    }
  };

  const onInternalChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { files: rawFiles } = e.target;
    if (!rawFiles) return;
    let files: File[] = [].slice.call(rawFiles);
    files = handleVerifiedFiles(files);

    if (isEmptyArray(files)) return;

    await handleUploadTasks(files);

    // 解决相同文件无法重复上传问题
    e.target.value = '';
  };

  const onRemove = (file: UploadFile) => {
    const removedFileList = internalFileList.filter((item) => item.uid !== file.uid);
    if (onChange) {
      onChange({
        file: { ...file, status: UploadStatus.REMOVED },
        fileList: removedFileList
      });
    }
    setInternalFileList(removedFileList);
  };

  const onOpenResource = (e: MouseEvent) => {
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    let files: File[] = [].slice.call(e.dataTransfer.files);
    if (!multiple) {
      files = files.slice(0, 1);
    }
    files = handleVerifiedFiles(files);

    if (isEmptyArray(files)) return;

    await handleUploadTasks(files);
  };

  return (
    <div className={classNames(cls, className, `${cls}-flex-${listType}`)}>
      <span onClick={onOpenResource}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onInternalChange}
          multiple={multiple}
          disabled={disabled}
        />
        {children || (showAdd && <Dragger onDrop={onFileDrop} onAdd={onOpenResource} />)}
      </span>

      <FileList type={listType} onRemove={onRemove} items={internalFileList} />
    </div>
  );
};

export default memo<UploadProps>(Upload) as FC<UploadProps>;
