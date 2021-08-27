## 📦 Install

```bash
npm install @3alan/ui
```

```bash
yarn add @3alan/ui
```

## 🔨 Usage

```jsx
import { Button } from '@3alan/ui';

const App = () => (
  <Button>awesome</Button>
);
```

And import style manually:

```jsx
import '@3alan/ui/dist/index.css';
```

## Online Example
[link](https://stackblitz.com/edit/react-hpui5v)


## TODO
- [ ] cjs支持，由于`roughjs`中的bin文件里的内容都是es6语法的
- [ ] eslint+prettier
- [ ] lerna
- [ ] 单元测试
- [x] storybook
- [ ] git hook husky
- [ ] 打包方案，使用时不用手动引入css
      参考：fluentui-ui、material-ui、ant-design

## Button
- [ ] 支持尽可能多的`rough`的api

## 版本号规则
https://semver.org/lang/zh-CN/

## ✨✨
https://github.com/rough-stuff
https://github.com/timqian/chart.xkcd
https://github.com/jwilber/roughViz
https://github.com/MissThee/hand-drawn-component
https://github.com/excalidraw/excalidraw/tree/master/src/renderer