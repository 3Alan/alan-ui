import classNames from 'classnames';
import { FC, useCallback, useRef, useState } from 'react';
import './index.scss';
import Compressor from 'compressorjs';
import Cropper, { ReactCropperProps } from 'react-cropper';
import ToolBar from './toolBar';
import Modal from '../modal';
import 'cropperjs/dist/cropper.css';

export interface ImageCropProps extends ReactCropperProps {
  /** 是否需要裁剪才能上传 */
  needCrop?: boolean;
  maxWidth?: number;
  maxHeight?: number;
}

const cls = 'image-cropper';

/**
 * 使用裁剪功能时，不支持upload的multiple。
 * 且accept为：image/*
 */
const ImageCropper: FC<ImageCropProps> = (props) => {
  const { children, needCrop, maxWidth, maxHeight, ...restProps } = props;
  const fileRef = useRef<File>(null);
  const resolveRef = useRef(null);
  const beforeUploadRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState<any>();
  const [preview, setPreview] = useState(null);

  const getCropData = useCallback(async () => {
    if (fileRef.current) {
      const { name, type } = fileRef.current;

      return new Promise((resolve) => {
        cropper.getCroppedCanvas().toBlob(
          (file: File) => {
            const newFile = new File([file], name, { type });
            resolve(newFile);
          },
          type,
          1
        );
      });
    }

    return null;
  }, [cropper]);

  const getUpload = useCallback(() => {
    const upload = Array.isArray(children) ? children[0] : children;
    const { beforeUpload, accept, ...restUploadProps } = upload.props;

    beforeUploadRef.current = beforeUpload;

    return {
      ...upload,
      props: {
        ...restUploadProps,
        accept: 'image/*',
        multiple: false,
        beforeUpload: (files) => {
          const currentFile = files[0];
          fileRef.current = currentFile;

          return new Promise((resolve) => {
            resolveRef.current = (newFile) => {
              resolve(newFile);
            };

            const reader = new FileReader();
            reader.addEventListener('load', () => setImage(reader.result));
            reader.readAsDataURL(currentFile);
          });
        }
      }
    };
  }, [children]);

  // 处理Upload自身的beforeUpload函数
  const handleBeforeUpload = async (finalFile) => {
    if (typeof beforeUploadRef.current !== 'function') {
      resolveRef.current([finalFile]);
    } else {
      const res = await beforeUploadRef.current([finalFile]);
      resolveRef.current(res);
    }
  };

  const compressFile = useCallback(
    async (file) => {
      const result = await new Promise((resolve, reject) => {
        // eslint-disable-next-line no-new
        new Compressor(file, {
          maxWidth,
          maxHeight,
          success(result) {
            resolve(result);
          },
          error(err) {
            reject(err.message);
          }
        });
      });

      return result;
    },
    [maxWidth, maxHeight]
  );

  const onClose = () => {
    setImage(null);
  };

  const onAbortUpload = () => {
    onClose();
    resolveRef.current([]);
  };

  // 直接上传不进行裁剪但是进行压缩
  const onSkipCropUpload = useCallback(async () => {
    const finalFile = await compressFile(fileRef.current);
    await handleBeforeUpload(finalFile);

    onClose();
  }, [compressFile]);

  const onEdit = useCallback(() => {
    setIsPreview(false);
  }, []);

  const onOk = useCallback(async () => {
    try {
      let finalFile = await getCropData();

      finalFile = await compressFile(finalFile);

      await handleBeforeUpload(finalFile);
      onClose();
    } catch (e) {
      console.error('something error![ImageCropper]');
    }
  }, [getCropData, compressFile]);

  const onDestroy = () => {
    setIsPreview(false);
  };

  const onRotateLeft = useCallback(() => {
    cropper.rotate(-90);
  }, [cropper]);

  const onPreview = useCallback(() => {
    const { type } = fileRef.current;
    const previewImage = cropper.getCroppedCanvas().toDataURL(type, 1);
    setPreview(previewImage);
    setIsPreview(true);
  }, [setPreview, setIsPreview, cropper]);

  return (
    <>
      {getUpload()}
      <Modal
        onDestroy={onDestroy}
        className={cls}
        width="600px"
        height="405px"
        visible={!!image}
        closable={false}
        onClose={onAbortUpload}
      >
        <div className={`${cls}-img-container`}>
          <Cropper
            {...restProps}
            className={classNames(`${cls}-white-board`, { [`${cls}-is-preview-crop`]: isPreview })}
            src={image}
            viewMode={1}
            center={false}
            dragMode="move"
            background={false}
            autoCropArea={0.6}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />

          <div
            className={classNames(`${cls}-preview`, {
              [`${cls}-is-preview`]: isPreview
            })}
          >
            <img src={preview} alt="" />
          </div>
        </div>

        <ToolBar
          needCrop={needCrop}
          isPreview={isPreview}
          onRotateLeft={onRotateLeft}
          onEdit={onEdit}
          onPreview={onPreview}
          onOk={onOk}
          onSkipCropUpload={onSkipCropUpload}
        />
      </Modal>
    </>
  );
};

ImageCropper.defaultProps = {
  needCrop: false,
  maxWidth: 400,
  maxHeight: 300
};

export default ImageCropper;
