## 简单介绍
6.x版`storybook`使用了`react-docgen`进行了参数文档生成，要想自动生成文档，需要在props上方使用`jsdoc`进行注释。
```tsx
interface demoProps {
  /**
   * discription
   */
  name?: string;
}

xxx.defaultProps = {
  name: 'storybook'
}
```

最后会被编译成类似下面的内容
```ts
argTypes = {
  label: {
    name: 'name',
    type: { name: 'name', required: false },
    defaultValue: 'storybook',
    description: 'discription',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'storybook' },
    },
    control: {
      type: 'text'
    }
  }
}
```

## 模板
```tsx
import { ComponentStory } from '@storybook/react';

export default {
  // Components为大类、 '/' 用来分隔一个层级
  title: 'Components/DatePicker',
  // 对应组件
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        // 扩展文档，当需要使用文字对组件进行一些解释时，可以在同目录下创建markdown文件并引用，文档内容将默认展示在页面下方
        component: 'md file or markdown content'
      }
    }
  }
};

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />;

// 当只有一个story时，不需要bind，直接导出story即可
export const story = Template.bind({});
// 默认参数设置
story.args = {}；

story.storyName = 'custom storyName';
```

### 纯文档模板
```tsx
import { Meta } from '@storybook/addon-docs';

<Meta title="Utils/Offset" />

// 将markdown内容写在这里即可
```

## 常用参数
```tsx
export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  // 自定义表格内容
  argTypes: {
    [propsName]: {
      description: 'description',

      type: {
        // props是否必须
        required: true
      },

      table: {
        // 不显示该字段
        disable: true,
        type: {
          // 对应props的的类型，例如：number/string
          summary: 'Something short', 
          // 对类型的详细解释
          detail: 'Something really really long' 
        },

        //对应defaultValue一列，参数含义和type一样
        defaultValue: {
          summary: 'defaultValue summary',
          detail: 'Something really really long' 
        }
      },

      // 不显示对应的control
      control: false,

      control: {
        type: 'radio/color/date/select/range',
        // 搭配radio/select使用
        options: ['1', '2'],

        // 搭配range使用
        min: 400,
        max: 1200,
        step: 50
      }
    },
  }
};
```

批量不显示某些参数
```tsx
// 可以使用正则

story.parameters = { controls: { exclude: ['props1', 'props2'] } };

story.parameters = { controls: { include: ['props3', 'props4'] } };
```

## 注意事项
- `jsdoc`无法实现热更新，需要重启服务。具体参考[issue](https://github.com/storybookjs/storybook/issues/13187#issuecomment-730855011)
- 自定义子类型无法生成文档，解决方案：自行书写markdown进行补充
  ```tsx
  interface Item {
    name: string;
  }

  interface props {
    list: Item[];
  } 
  ```
  即Item的内容无法解析，得到的结果是：
  ```ts
  table: {
    type: { summary: 'Item[]' },
  }
  ```
- 每个组件导出时要命名，相关[issue](https://github.com/storybookjs/storybook/issues/13408)
  无效写法
  ```ts
  export default class xxx;

  export default function xxx;

  const xxx:FC<p> = () => {};
  export default xxx;
  ```
  正确写法
  ```ts
  class xxx;
  export default xxx;

  function xxx(){};
  export default xxx;

  const xxx:FC<p> = () => {};
  export default xxx;
  ```
