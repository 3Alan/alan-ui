import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { canUseDom } from '../../utils';
import Mask from './Mask';
import classNames from 'classnames';
import RoughWrap from '../roughWrap';
import Button from '../button';
import useOnClickOutside from '../../utils/hooks/useOnClickOutside';

const cls = 'modal';

export interface ModalProps {
  visible: boolean;
  /**
   * 是否展示遮罩层
   */
  mask?: boolean;
  /**
   * 点击弹框外区域是否关闭弹窗
   */
  maskClosable?: boolean;
  /**
   * 关闭弹窗函数
   */
  onClose: () => void;
}

/**
 * 弹窗组件
 */
export const Modal: FC<ModalProps> = props => {
  const { mask, visible, children, maskClosable, onClose } = props;
  const modalRef = useRef<HTMLElement>();
  const maskCloseHandler = maskClosable ? onClose : () => {};
  useOnClickOutside(modalRef, () => maskCloseHandler());

  const ModalWrap = () => {
    if (!visible) return null;

    return (
      <>
        {mask && <Mask />}
        <div className={classNames(cls, `${cls}-wrap`)}>
          <RoughWrap
            ref={modalRef}
            customElement="div"
            shap="rectTangle"
            className={classNames(`${cls}-content`)}
          >
            {children}
            <Button onClick={() => onClose()} type="standard">
              Close
            </Button>
          </RoughWrap>
        </div>
      </>
    );
  };

  if (!canUseDom) return null;

  return createPortal(<ModalWrap />, document.body);
};

Modal.defaultProps = {
  mask: true,
  maskClosable: true
};

export default Modal;