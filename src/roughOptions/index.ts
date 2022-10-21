const RoughOptions = {
  roughness: {
    description: '潦草程度',
    table: {
      category: 'roughProps',
      type: {
        summary: 'number'
      }
    },
    control: {
      type: 'number'
    }
  },
  stroke: {
    description: '边框颜色',
    table: {
      category: 'roughProps',
      type: {
        summary: 'string'
      }
    },
    control: {
      type: 'color'
    }
  },
  strokeWidth: {
    description: '边框宽度',
    table: {
      category: 'roughProps',
      type: {
        summary: 'number'
      }
    },
    control: {
      type: 'number'
    }
  },
  fill: {
    description: '背景颜色',
    table: {
      category: 'roughProps',
      type: {
        summary: 'string'
      }
    },
    control: {
      type: 'color'
    }
  },
  fillStyle: {
    description: '填充效果',
    table: {
      category: 'roughProps',
      type: {
        summary: 'hachure|solid|zigzag|cross-hatch|dots|sunburst|dashed|zigzag-line'
      }
    },
    control: {
      type: 'select',
      options: ['hachure', 'solid', 'zigzag', 'cross-hatch', 'dots', 'sunburst', 'dashed', 'zigzag-line']
    }
  },
  fillWeight: {
    description: '填充线条的粗细程度',
    table: {
      category: 'roughProps',
      type: {
        summary: 'number'
      }
    },
    control: {
      type: 'number'
    }
  },
  seed: {
    description: '随机种子，在重复渲染时每次渲染的内容都不一样，范围1~2^31',
    table: {
      category: 'roughProps',
      type: {
        summary: 'number'
      }
    },
    control: {
      type: 'number'
    }
  },
  bowing: {
    description: '线条的弯曲程度，0代表直线',
    table: {
      category: 'roughProps',
      type: {
        summary: 'number'
      }
    },
    control: {
      type: 'number'
    }
  },
  others: {
    description: '其他参数参考roughjs[文档](https://github.com/rough-stuff/rough/wiki#roughness)',
    table: {
      category: 'roughProps'
    }
  }
};

export default RoughOptions;
