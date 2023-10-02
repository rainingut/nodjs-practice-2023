import  puppeteer from 'puppeteer';
const waitForTimeout = (t) => new Promise((resolve) => setTimeout(resolve, t));

(async () => {
	// =========== browser
  // 使用自訂的 Chrome
  const browser = await puppeteer.launch({
    // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: false // 無外殼的 Chrome，有更佳的效能
  });
	// =========== page
  const page = await browser.newPage(); // 開啟新分頁
	await page.setViewport({width:700,height:700}); // window size
  await page.goto('https://rainingut.github.io/little-tools/'); // 進入指定頁面
  // await page.screenshot({ path: 'example.png' }); // 截圖，並且存在...

	// =========== start test
  const speakBtnSelector = 'body > ul > li:nth-child(4) > a'; // css selector (href)
  await page.waitForSelector(speakBtnSelector);
  await page.click(speakBtnSelector); 

  const speakTextareaSeelctor = 'textarea';
  await page.waitForSelector(speakTextareaSeelctor);// css selector (textarea)
  // 確保欄位清除
  await page.evaluate(() => {
    document.querySelector('textarea').value = '';
  });
  // =========== 測試值
  const expectStr = '哈哈，測試，你好';
  await page.type(speakTextareaSeelctor, expectStr);
  const value = await page.$eval(speakTextareaSeelctor, (el)=>el.textContent.trim());
  if(expectStr===value){
    console.log('測試成功')
  } else {
    console.log(`測試失敗，期望值為 ${expectStr}，實際值為 ${value}`);
  }

	// =========== end test
  await waitForTimeout(5000);  // wait 5 sencods
  browser.close(); // 關閉瀏覽器
})();