import { MutableRefObject } from 'react';

export const canUseDom = () => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

export const getPoverPostionBySelector = (
  targetEl: string,
  popoverEl: MutableRefObject<HTMLElement | null | undefined>
) => {
  if (!popoverEl || !popoverEl.current) {
    return {
      bottom: 0,
      left: 0
    };
  }

  const targetPostion = document.querySelector(targetEl)?.getBoundingClientRect() || { bottom: 0, left: 0, width: 0 };
  const popoverPostion = popoverEl.current.getBoundingClientRect() || { width: 0 };

  const { bottom, left, width: targetWidth } = targetPostion;
  const { width } = popoverPostion;

  console.log(popoverPostion);

  return {
    bottom,
    left: left - width / 2 + targetWidth / 2
  };
};
