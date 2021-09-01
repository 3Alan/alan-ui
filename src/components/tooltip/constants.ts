import { BuildInPlacements } from 'rc-trigger';

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

const targetOffset = [0, 0];

export const placements: BuildInPlacements = {
  left: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflow,
    offset: [-10, 0],
    targetOffset
  },
  right: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflow,
    // right由于左边的小箭头需要像右偏移一点
    offset: [12, 0],
    targetOffset
  },
  top: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -10],
    targetOffset
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 6],
    targetOffset
  }
  // topLeft: {
  //   points: ['bl', 'tl'],
  //   overflow: autoAdjustOverflow,
  //   offset: [0, -4],
  //   targetOffset
  // },
  // leftTop: {
  //   points: ['tr', 'tl'],
  //   overflow: autoAdjustOverflow,
  //   offset: [-4, 0],
  //   targetOffset
  // },
  // topRight: {
  //   points: ['br', 'tr'],
  //   overflow: autoAdjustOverflow,
  //   offset: [0, -4],
  //   targetOffset
  // },
  // rightTop: {
  //   points: ['tl', 'tr'],
  //   overflow: autoAdjustOverflow,
  //   offset: [4, 0],
  //   targetOffset
  // },
  // bottomRight: {
  //   points: ['tr', 'br'],
  //   overflow: autoAdjustOverflow,
  //   offset: [0, 4],
  //   targetOffset
  // },
  // rightBottom: {
  //   points: ['bl', 'br'],
  //   overflow: autoAdjustOverflow,
  //   offset: [4, 0],
  //   targetOffset
  // },
  // bottomLeft: {
  //   points: ['tl', 'bl'],
  //   overflow: autoAdjustOverflow,
  //   offset: [0, 4],
  //   targetOffset
  // },
  // leftBottom: {
  //   points: ['br', 'bl'],
  //   overflow: autoAdjustOverflow,
  //   offset: [-4, 0],
  //   targetOffset
  // }
};

export type PlacementsType = 'left' | 'right' | 'top' | 'bottom';

export type TriggerType = 'hover' | 'focus' | 'click' | 'contextMenu';

export default placements;
