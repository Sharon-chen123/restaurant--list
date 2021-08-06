# h1 我的電影清單
此專案是可以查詢查詢餐廳資訊、評價、地址等等，且依照餐廳名稱與類別進行搜尋，詳細功能請參考如下。

## 功能列表
+ 首頁有餐廳清單
+ 點選餐廳圖卡檢視餐廳詳細資訊(類別、地址、電話、評分、圖片及簡介)
+ 可使用search bar的功能輸入關鍵字，會篩選出你想要的餐廳

# h2 安裝
1. 開啟終端機terminal，Clone 此專案至本機電腦
git remote add origin https://github.com/Sharon-chen123/restaurant-list.git

2. 初始
cd restaurant-list  //切至專案資料夾

3. 安裝 npm 套件
在 Terminal 輸入 npm install 指令

4. 安裝 nodemon 套件
在 Terminal 輸入 nodemon app.js 指令

5. 開啟程式
npm run dev  //執行程式

6. 最後
終端顯示 express is listening on http://localhost:3000 表示完成，請至http://localhost:3000開始使用程式

## 使用工具

檔案管理
* npm：7.7.6
+ express: 4.17.1
- express handlebars: 5.3.2
* nodemon: 2.0.9

視覺呈現
* jquery: 3.6.0
+ popper: v2.9.1
- bootstrap: v4.6.0