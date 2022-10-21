import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BiX } from 'react-icons/bi';
import Mask from '../mask';
import RoughWrap from '../roughWrap';
import { useOnClickOutside } from '../../utils/hooks';
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
        <RoughWrap
          roughProps={{ roughness: 0, fill: '#fff', fillStyle: 'solid', stroke: '#374151' }}
          className={cls}
          ref={modalRef}
          customElement="div"
          shape="roundedRectTangle"
          radius="12 12 12 12"
        >
          <div className={`${cls}-content`}>{children}</div>

          <div data-testid="close" className={`${cls}-close`} onClick={onClose}>
            <Icon item={BiX} fillStyle="solid" roughness={0} fill="#374151" />
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
