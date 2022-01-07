import { Icon, LoadingContainer, Modal } from '@autobest-ui/components';
import classNames from 'classnames';
import { FC, Fragment, memo, useEffect, useMemo, useState } from 'react';
import { UploadFile, UploadStatus } from '../interface';
import { getBase64 } from '../utils';
import './index.scss';

interface FileItemProps {
  item: UploadFile;
  className?: string;
  onRemove: () => void;
}

const cls = 'uploader-fl';

const FileItem: FC<FileItemProps> = (props) => {
  const { item, onRemove, className } = props;
  const { url, status } = item;
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const uploadFailed = useMemo(() => status === UploadStatus.ERROR, [status]);
  const uploading = useMemo(() => status === UploadStatus.UPLOADING, [status]);

  useEffect(() => {
    if (uploading) {
      getBase64(item.rawFile).then((res) => setPreviewImage(res));
    }
  }, [item, uploading]);

  const onPreview = () => {
    setIsPreviewVisible(true);
  };

  const onPreviewModalClose = () => {
    setIsPreviewVisible(false);
  };

  return (
    <LoadingContainer
      loading={uploading}
      className={classNames(className, `${cls}-fi`, {
        [`${cls}-error`]: uploadFailed
      })}
    >
      <>
        {uploading && <img src={previewImage} alt="" />}
        {uploadFailed ? <div className={`${cls}-error-info`}>error</div> : <img src={url} alt="" onClick={onPreview} />}
        <div className={`${cls}-delete`} onClick={onRemove}>
          <Icon name="close" color="#f9f9fa" width={0.1} height={0.1} />
        </div>

        <Modal
          width="400px"
          height="auto"
          closable={false}
          className={`${cls}-preview-modal`}
          visible={isPreviewVisible}
          onClose={onPreviewModalClose}
        >
          <img src={url} alt="" />
        </Modal>
      </>
    </LoadingContainer>
  );
};

export default memo(FileItem);
