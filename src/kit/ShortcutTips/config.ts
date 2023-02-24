const CONFIG = [
  {
    title: '画布',
    children: [
      { title: '拖拽画布', mac: '空白格+拖拽', win: '空白格+拖拽' },
      {
        title: '画布缩小',
        mac: '⌘ + - 或 ⌘ + 滚轮',
        win: 'Ctrl + - 或 Ctrl + 滚轮',
      },
      {
        title: '画布放大',
        mac: '⌘ + + 或 ⌘ + 滚轮',
        win: 'Ctrl + + 或 Ctrl + 滚轮',
      },
    ],
  },
  {
    title: '元素',
    children: [
      { title: '移动', mac: '方向键', win: '方向键' },
      { title: '快速移动', mac: 'shift + 方向键', win: 'shift + 方向键' },
      { title: '复制', mac: '⌘ + C', win: 'Ctrl + C' },
      { title: '粘贴', mac: '⌘ + V', win: 'Ctrl + V' },
      // { title: '多选', mac: '⌘ + C', win: 'Ctrl + C' },
      // { title: '复制', mac: '⌘ + C', win: 'Ctrl + C' },
      // { title: '复制', mac: '⌘ + C', win: 'Ctrl + C' },
    ],
  },
];

const getSystem = () => {
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  return isMac ? 'mac' : 'win';
};
export { getSystem, CONFIG };
