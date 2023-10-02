import axios from'axios'; // 用於發送 HTTP 請求
import cheerio from'cheerio'; // 用於解析 HTML

// 發送 HTTP GET 請求
axios.get('https://goodinfo.tw/tw/ShowBuySaleChart.asp?STOCK_ID=2330&CHT_CAT=DATE')
  .then((response) => {
    // 使用 Cheerio 加載網頁內容
    const $ = cheerio.load(response.data);

    // 選擇所需的表格行
    const rows = $('#divBuySaleDetail table tbody tr');

    const data = [];
    // 遍歷每個選定的行，並抓取所需的信息
    rows.each((index, element) => {
      const row = $(element);
      const period = row.find('td:nth-child(1)').text();
      const transaction = row.find('td:nth-child(2)').text();
      const change = row.find('td:nth-child(3)').text();
      const changePercentage = row.find('td:nth-child(4)').text();
      const netBuySell = row.find('td:nth-child(19)').text();

      const rowData = {
        "期別": period,
        "成交": transaction,
        "漲跌(%)": changePercentage,
        "三大法人合計(買賣超(張))": netBuySell,
      };
      data.push(rowData);
      //   console.log(`期別: ${period}`);
      //   console.log(`成交: ${transaction}`);
      //   console.log(`漲跌(%): ${changePercentage}`);
      //   console.log(`三大法人合計(買賣超(張)): ${netBuySell}`);
    });
    // 呈現結果
    console.log(data)
  })
  .catch((error) => {
    console.error('發生錯誤:', error);
  });
