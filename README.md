# Fakeplushie

Netlify 連結：https://fakeplushie.netlify.app/

作品參考自 https://www.youtube.com/watch?v=377AQ0y6LPA&t=158s - ECommerce Web Shop - Build & Deploy an Amazing App | React.js, Commerce.js, Stripe

# Project 使用到的技術，以及為何使用？

1) 使用 react-redux, redux 來集中管理多個 component 都可能會使用到的 State (cart) 
   並且搭配 redux-thunk middleware 來解決原生 redux 只能做同步任務的問題。
   
2) 使用 react-hook-form，因為自行撰寫表單邏輯時，若表單內有很多個 Input 的話，每個 Input 又有不同的驗證邏輯
   長期下來會難以維護，且自行寫的表單，效能並不一定會直接用 library 來得好，於是採用這個 library。

3) 使用 Material-UI，像使用 Bootstrap 4 一樣，可以直接套用 library 現成的版面樣式，便於開發。 
   
# 自己寫的 project 與範例影片有什麼不同的點或者是開發時遇到什麼困難？

1) 在跟著範例影片撰寫程式時，有發現到作者的 props，有時候會傳超過兩層，也發現到這樣子比較不好管理某些 props 該傳到哪個 component
   對我來說我覺得這是比較不好的，於是採用了 react-redux, redux, redux-thunk 來集中管理購物車的邏輯
   把從購物車內增減商品、更新、清空購物車的邏輯，都寫成了 action creator 跟 reducer
   然而比較困擾的是因為這些邏輯都是透過串接 API 來達成的，而 API 所回傳的資料結構都很相似
   不太清楚要怎麼寫，才比較好，所以在 reducer 更新 global state 時很容易被看的出來是臨時的實作
 
2) 影片中的 react-hook-form 的寫法是比較舊的 API、再加上自己有額外加表單驗證的功能，
   所以花了一段時間翻了 react-hook-form 的 doc 跟 stackoverflow 來完成表單功能。
   
3) 影片中並沒有串商品分門別類的 API，我有額外串接分類的 API，並且自行撰寫簡易的 custom hook (useCategories) 跟 component (Category)
   來完成在 Products 頁面時可以執行分類的功能，使用者在點選該頁面上的按鈕就可以進行商品分類。

4) 採用與影片中些許不同的檔案管理風格，把頁面拆到 pages 資料夾內管理、把元件拆到 components　資料夾內管理。
　 相反地，影片中的檔案管理風格為只要是 .jsx 的檔案都拆到 components 資料夾內管理，該資料夾內的元件資料夾又會多包一兩層資料夾
   我覺得這樣在專案長大時，會比較不好管理，於是採用了我自己的風格。

5) 將直接在表單元件內透過 API 獲取 Countries、Subdivisions 的邏輯改寫成 custom hook 

6) 影片中即使購物車沒有商品，使用者依然可以在 Checkout 頁面中透過填寫相關資訊來下訂單。
   於是自行撰寫了 可複用的 Modal 元件，並且在 Checkout 頁面時會檢查使用者有沒有加入商品到購物車
   如果沒有加入商品，畫面就會跳出 Modal，提醒使用者應該要加入商品到購物車，才能填寫ˇ資訊
   
7) 影片中在 Products 頁面時，加入商品的一增一減都是透過按 +1 或 -1 的按鈕來進行的，
　 這樣使用者如果要一次訂購大量商品時，會需要大量 call API，可能會造成對方伺服器的負擔
   於是我額外加了可以在 input 內填寫數字，並且在離開 input 時 (onBlur 事件) 才會 call API 的功能
  
# 對這個 project 未來的期許

目前正在學 Next.js、Typescript，希望能把這個專案改寫成用 Next.js + Typescript 所撰寫而成的
這樣可以增強網頁的 SEO、並且在管理 data 的型態時也比較好管理
