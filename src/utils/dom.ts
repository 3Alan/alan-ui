import { MutableRefObject } from 'react';
import { Point } from 'roughjs/bin/geometry';
import { PlacementsType } from '../components/tooltip/constants';

export const canUseDom = () => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

// 返回guide组件中popover对应的位置
export const getPopoverPosition = (targetEl: string, popoverEl: MutableRefObject<HTMLElement | null | undefined>) => {
  if (!popoverEl || !popoverEl.current) {
    return {
      top: 0,
      left: 0
    };
  }

  const { offsetTop, offsetWidth, offsetLeft, offsetHeight } = document.querySelector(targetEl) as HTMLElement;
  const popoverWidth = popoverEl.current.offsetWidth;

  return {
    top: offsetTop + offsetHeight,
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

// 获取安全区域大小，由于roughjs的roughness越大，canvas的区域也就越大
export const getSafeSize = (placement: PlacementsType, width = 0, height = 0) => {
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

// 确认arrow的位置并返回svg对应的path
export const getPopoverPath = (width = 0, height = 0, placement: PlacementsType) => {
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

export interface TabsNavInfo {
  canvasSize: { width: number; height: number };
  path: Point[];
}

export const getTabsNavInfo = (parentSelector: string, activeSelector: string): TabsNavInfo => {
  const parentEl = document.querySelector(parentSelector) as HTMLElement;
  const activeEl = document.querySelector(activeSelector) as HTMLElement;
  const height = activeEl.offsetHeight;
  const width = activeEl.offsetWidth;
  const leftStart = activeEl.offsetLeft || 2;
  const leftEnd = activeEl.offsetLeft + width;

  return {
    canvasSize: { width: parentEl.offsetWidth, height: parentEl.offsetHeight + 2 },
    path: [
      [2, height],
      [leftStart, height],
      [leftStart, 1],
      [leftEnd, 1],
      [leftEnd, height],
      [parentEl.offsetWidth, height]
    ] as Point[]
  };
};
