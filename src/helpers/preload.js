// 用來解決 Slides 在第一輪會閃動的問題 (網頁要用到圖片時才會下載該圖片)
// 參考資料：
// https://web.dev/preload-responsive-images/
// https://www.programmersought.com/article/89933782669/
// https://perishablepress.com/3-ways-preload-images-css-javascript-ajax/

const preload = (targetImgs) => {
  const images = [];

  for (let i = 0; i < targetImgs.length; i++) {
    images[i] = new Image();
    images[i].src = targetImgs[i];
  }
};

export default preload;
