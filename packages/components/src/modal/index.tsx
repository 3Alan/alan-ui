import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import { useOnClickOutside } from '@3alan/utils';
import Mask from '../mask';
import RoughWrap from '../roughWrap';
import Icon from '../icon';

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
        <RoughWrap className={cls} ref={modalRef} customElement="div" shape="rectTangle">
          <div className={`${cls}-content`}>{children}</div>

          <div data-testid="close" className={`${cls}-close`} onClick={onClose}>
            <Icon item={FaTimes} />
          </div>
        </RoughWrap>
      </>
    );
  };

  return targetRef.current ? createPortal(<ModalWrap />, targetRef.current) : null;
};

Modal.defaultProps = {
  mask: true,
  maskClosable: true
};

export default Modal;
