import { FC, memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Mask from '../mask';
import RoughWrap from '../roughWrap';
import Button from '../button';
import { useOnClickOutside } from '../../utils/hooks';

const cls = 'alan-modal';

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
export const Modal: FC<ModalProps> = (props) => {
  const { mask, visible, children, maskClosable, onClose } = props;
  const modalRef = useRef<HTMLElement>();
  const targetRef = useRef<HTMLElement>();
  const maskCloseHandler = maskClosable ? onClose : () => {};

  useOnClickOutside(modalRef, () => maskCloseHandler());

  useEffect(() => {
    targetRef.current = document.body;
  }, []);

  const ModalWrap = () => {
    if (!visible) return null;

    return (
      <>
        {mask && <Mask />}
        <div className={classNames(cls, `${cls}-wrap`)}>
          <RoughWrap ref={modalRef} customElement="div" shap="rectTangle" className={classNames(`${cls}-content`)}>
            {children}
            <Button onClick={() => onClose()} type="standard">
              Close
            </Button>
          </RoughWrap>
        </div>
      </>
    );
  };

  return targetRef.current ? createPortal(<ModalWrap />, targetRef.current) : null;
};

Modal.defaultProps = {
  mask: true,
  maskClosable: true
};

export default memo(Modal);
