import classNames from 'classnames';
import { FC, memo, useMemo } from 'react';
import { FaFileAlt, FaTrashAlt } from 'react-icons/fa';
import Icon from '../../icon';
import Progress from '../../progress';
import { UploadFile, UploadStatus } from '../interface';

interface TextItemProps {
  item: UploadFile;
  className?: string;
  onRemove: () => void;
}

const cls = 'alan-upload-fl';

const TextItem: FC<TextItemProps> = (props) => {
  const { item, onRemove, className } = props;
  const { status, name, percent = 0 } = item;

  const uploading = useMemo(() => status === UploadStatus.UPLOADING, [status]);
  const uploadFailed = useMemo(() => status === UploadStatus.ERROR, [status]);
  const uploadSuccess = useMemo(() => status === UploadStatus.DONE, [status]);

  return (
    <>
      <div
        className={classNames(className, `${cls}-text-fi`, `${cls}-align-center`, {
          [`${cls}-text-success`]: uploadSuccess,
          [`${cls}-text-error`]: uploadFailed
        })}
      >
        <div className={`${cls}-align-center`}>
          <Icon item={FaFileAlt} width={12} height={12} />
          <div className={`${cls}-name`}>{name}</div>
        </div>
        <div className={`${cls}-text-delete`} onClick={onRemove}>
          <Icon item={FaTrashAlt} width={12} height={12} />
        </div>
      </div>
      {uploading && <Progress percent={percent} />}
    </>
  );
};

export default memo(TextItem);
