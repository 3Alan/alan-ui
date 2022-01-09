import classNames from 'classnames';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { UploadFile, UploadStatus } from '../interface';
import { getBase64 } from '../utils';
import Modal from '../../modal';
import Icon from '../../icon';
import { RoughWrap } from '../../roughWrap';

interface PictureItemProps {
  item: UploadFile;
  className?: string;
  onRemove: () => void;
}

const cls = 'alan-upload-fl';

const PictureItem: FC<PictureItemProps> = (props) => {
  const { item, onRemove, className } = props;
  const { url = '', status } = item;
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const uploadFailed = useMemo(() => status === UploadStatus.ERROR, [status]);
  const uploading = useMemo(() => status === UploadStatus.UPLOADING, [status]);

  const roughProps = useMemo(
    () => ({
      stroke: uploadFailed ? '#ff4d4f' : '#d9d9d9'
    }),
    [status]
  );

  useEffect(() => {
    if (uploading) {
      getBase64(item.rawFile as File).then((res) => setPreviewImage(res));
    }
  }, [item, uploading]);

  const onPreview = () => {
    setIsPreviewVisible(true);
  };

  const onPreviewModalClose = () => {
    setIsPreviewVisible(false);
  };

  return (
    <>
      <RoughWrap customElement="div" className={classNames(className, `${cls}-picture-fi`)} roughProps={roughProps}>
        {uploading && <img src={previewImage} alt="" />}
        {uploadFailed ? <div className={`${cls}-error-info`}>error</div> : <img src={url} alt="" onClick={onPreview} />}
        <div className={`${cls}-picture-delete`} onClick={onRemove}>
          <Icon fill="#fff" item={FaTimes} width={8} height={8} />
        </div>
      </RoughWrap>
      <Modal maskClosable={false} visible={isPreviewVisible} onClose={onPreviewModalClose}>
        <img className={`${cls}-preview-img`} src={url} alt="" />
      </Modal>
    </>
  );
};

export default memo(PictureItem);
