import { MutableRefObject } from 'react';
import { Point } from 'roughjs/bin/geometry';
import { PlacementsType } from '../components/tooltip/constants';

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

  const { offsetTop, offsetWidth, offsetLeft, offsetHeight } = document.querySelector(targetEl) as HTMLElement;
  const popoverWidth = popoverEl.current.offsetWidth;

  return {
    bottom: offsetTop + offsetHeight,
    left: offsetLeft - popoverWidth / 2 + offsetWidth / 2
  };
};

// 是否在可视区域内
export const isElementVisible = (selector: string) => {
  const visibleAreaHeight = document.documentElement.clientHeight;
  const targetEl = document.querySelector(selector);
  const { top, bottom } = targetEl?.getBoundingClientRect() || { top: 0, bottom: 0 };

  return !(top > visibleAreaHeight || bottom < 0);
};

export const getSafeSize = (placement: PlacementsType, width: number, height: number) => {
  if (placement === 'top' || placement === 'bottom') {
    return {
      width: width + 2,
      height: height + 15
    };
  }
  return {
    width: width + 15,
    height: height + 2
  };
};

export const getPopoverPath = (width: number, height: number, placement: PlacementsType) => {
  const minWidth = width > 60 ? width : 60;
  const minHeight = width > 30 ? height : 30;

  const pathMap = {
    bottom: [
      [2, 5],
      [(minWidth - 8) / 2, 5],
      [(minWidth - 8) / 2 + 4, 2],
      [(minWidth - 8) / 2 + 8, 5],
      [minWidth, 5],
      [minWidth, minHeight + 5],
      [2, minHeight + 5]
    ],
    top: [
      [2, 0],
      [minWidth, 2],
      [minWidth, minHeight],
      [(minWidth - 8) / 2 + 8, minHeight],
      [(minWidth - 8) / 2 + 4, minHeight + 3],
      [(minWidth - 8) / 2, minHeight],
      [2, minHeight]
    ],
    left: [
      [0, 0],
      [minWidth, 0],
      [minWidth, (minHeight - 8) / 2],
      [minWidth + 3, (minHeight - 8) / 2 + 4],
      [minWidth, (minHeight - 8) / 2 + 8],
      [minWidth, minHeight],
      [0, minHeight]
    ],
    right: [
      [minWidth + 5, 0],
      [5, 0],
      [5, (minHeight - 8) / 2],
      [2, (minHeight - 8) / 2 + 4],
      [5, (minHeight - 8) / 2 + 8],
      [5, minHeight],
      [minWidth + 5, minHeight]
    ]
  };
  return pathMap[placement] as Point[];
};
