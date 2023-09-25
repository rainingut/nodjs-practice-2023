import  puppeteer from 'puppeteer';

(async () => {
  // 使用自訂的 Chrome
  const browser = await puppeteer.launch({
    // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: false // 無外殼的 Chrome，有更佳的效能
  });
  const page = await browser.newPage(); // 開啟新分頁
  await page.goto('https://example.com'); // 進入指定頁面
  await page.screenshot({ path: 'example.png' }); // 截圖，並且存在...
  setTimeout(()=>{
    browser.close(); // 關閉瀏覽器
  },20000);
})();