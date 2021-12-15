import { FC, memo } from 'react';
import Button from '../../button';
import './index.scss';

interface ToolBarProps {
  needCrop?: boolean;
  isPreview: boolean;
  onEdit: () => void;
  onPreview: () => void;
  onOk: () => void;
  onSkipCropUpload: () => void;
  onRotateLeft: () => void;
}

const cls = 'image-cropper-tool-bar';

const ToolBar: FC<ToolBarProps> = (props) => {
  const { isPreview, needCrop, onRotateLeft, onEdit, onSkipCropUpload, onPreview, onOk } = props;

  return (
    <div className={cls}>
      <div className={`${cls}-edit`}>
        {isPreview ? (
          <Button size="small" type="standard" onClick={onEdit}>
            Edit
          </Button>
        ) : (
          <>
            <Button size="small" onClick={onRotateLeft} type="standard">
              Rotate left
            </Button>
            <Button size="small" type="standard" onClick={onPreview}>
              Preview
            </Button>
          </>
        )}
      </div>

      <div className={`${cls}-complete`}>
        {!needCrop && (
          <Button size="small" type="standard" onClick={onSkipCropUpload}>
            No crop
          </Button>
        )}

        <Button size="small" onClick={onOk}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default memo(ToolBar);
