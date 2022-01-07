import classNames from 'classnames';
import React, { ChangeEvent, FC, memo, MouseEvent, useMemo, useRef } from 'react';
import { UploadFile, UploadStatus } from './interface';
import FileList from './fileList/FileList';
import { getUid, verifyMIME } from './utils';
import useStateFromProp from './useStateFromProps';
import Dragger from './Dragger';
import { isEmptyArray } from '../../utils';

interface OnChangeEvent {
  file: UploadFile;
  fileList: UploadFile[];
}

interface ResponseData {
  url: string;
  [key: string]: any;
}

interface UploaderProps {
  action?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  fileList?: UploadFile[];
  maxCount?: number;
  onCountExceed?: (exceed: number) => void;
  customRequest?: (formData: FormData) => Promise<UploadFile[]>;
  onChange?: (e: OnChangeEvent) => void;
  /** 返回 [] 会中断上传 */
  beforeUpload?: (fileList: File[]) => File[] | Promise<File[]>;
}

const cls = 'alan-upload';

export const Uploader: FC<UploaderProps> = (props) => {
  const {
    children,
    accept,
    multiple,
    disabled,
    action,
    maxCount,
    fileList,
    className,
    beforeUpload,
    onChange,
    onCountExceed,
    customRequest
  } = props;
  const inputRef = useRef<HTMLInputElement>();

  useMemo(() => {
    // 初始化时添加uid和status
    fileList.forEach((file) => {
      if (!file.uid) {
        file.uid = getUid();
      }
      if (!file.status) {
        file.status = UploadStatus.DONE;
      }
    });
  }, [fileList]);

  const [internalFileList, setInternalFileList] = useStateFromProp(fileList);
  const showAdd = useMemo(() => internalFileList.length < maxCount, [internalFileList, maxCount]);

  const post = async (file): Promise<ResponseData> => {
    const form = new FormData();
    form.append(file.name, file);
    let data;

    if (customRequest) {
      data = await customRequest(form);
    } else {
      data = await fetch(action, {
        method: 'POST',
        body: form
      }).then((res) => res.json());
    }

    return data;
  };

  const updateStatus = (currentTask: UploadFile, status?: string, url?: string) => {
    let newFileList;
    let currentFile;

    setInternalFileList((prev) => {
      newFileList = prev.map((task) => {
        if (task.uid !== currentTask.uid) return task;

        currentFile = {
          name: currentTask.rawFile.name,
          uid: currentTask.uid,
          url,
          status
        };
        return currentFile;
      });
      return newFileList;
    });

    if (onChange) {
      onChange({ file: { ...currentFile, rawFile: currentTask.rawFile }, fileList: newFileList });
    }
  };

  const upload = async (tasks: UploadFile[]) => {
    await Promise.all(
      tasks.map(async (currentTask) => {
        try {
          const result = await post(currentTask.rawFile);
          updateStatus(currentTask, UploadStatus.DONE, result.url);
          alert(`${currentTask.rawFile.name} success!`);
        } catch (e) {
          updateStatus(currentTask, UploadStatus.ERROR, '');
          alert(`${currentTask.rawFile.name} failed!`);
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
    const verifiedFiles = [];
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
    if (beforeUpload) {
      files = await beforeUpload(files);
    }

    // 添加状态
    const newTasks: UploadFile[] = files.map((file) => ({
      uid: getUid(),
      status: UploadStatus.UPLOADING,
      rawFile: file
    }));

    console.log(newTasks);

    if (!isCountExceed(newTasks.length)) {
      setInternalFileList((prev) => [...prev, ...newTasks]);
      await upload(newTasks);
    }
  };

  const onInternalChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { files: rawFiles } = e.target;
    if (!rawFiles) return;
    let files = [].slice.call(rawFiles);
    files = handleVerifiedFiles(files);

    if (isEmptyArray(files)) return;

    await handleUploadTasks(files);

    // 解决相同文件无法重复上传问题
    e.target.value = '';
  };

  const onRemove = (file) => {
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

    let files = [].slice.call(e.dataTransfer.files);
    if (!multiple) {
      files = files.slice(0, 1);
    }
    files = handleVerifiedFiles(files);

    if (isEmptyArray(files)) return;

    await handleUploadTasks(files);
  };

  return (
    <div className={classNames(cls, className, `${cls}-flex`)}>
      <FileList onRemove={onRemove} items={internalFileList} />

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
    </div>
  );
};

Uploader.defaultProps = {
  action: 'https://run.mocky.io/v3/ef7967a7-4733-43ad-b37e-dc446998556a',
  fileList: [],
  maxCount: 6,
  accept: 'image/*'
};

export default memo<UploaderProps>(Uploader);
