import { printLine } from './print';
export const toggleAppFrame = () => {
  const appFrame = document.querySelector('.app-frame');
  const appFrameStyle = appFrame as HTMLElement;
  if (appFrameStyle) {
    appFrameStyle.style.display = appFrameStyle.style.display !== 'block' ? 'block' : 'none';
  }
}