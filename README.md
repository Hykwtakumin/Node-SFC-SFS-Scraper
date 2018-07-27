# Node-SFC-SFS-Scraper

Node.jsでSFC-SFSに対してクロールする

this project uses:
 - typescript (ES6以上の新記法への対応/静的型付け)
 - cheerio-httpcli (DOMの解析用)
 - axios (HTTPリクエスト全般)
 - dotenv (環境変数を用いた認証情報等の注入)
 
 this project does NOT use:
 - yeomen
 - Webpack
 - gulp


## Getting Started

    % git clone https://github.com/Hykwtakumin/Node-SFC-SFS-Scraper.git
    % npm install
    % npm run build
    
## How to run
 - `.env.sample`にSFF-SFSのユーザー名とパスワードを書き込んで保存します
 - `.env.sample`を`.env`にリネームします
 - `$ npm install`で依存パッケージをインストールします
 - `$ npm run build`でコードを実行可能な形式にコンパイルします
 - `$ node ./dist/index.js`でコードを実行します

## Point
 - 基本的に`./src`の内部のコードを編集していきます(`./dist`以下は基本的にいじりません)
 - DOMの解析にはcheerioを用いています
 - cheerioの操作はjQueryに似ているのでjQueryの知識があるとやりやすいかもしれません
 - 認証情報を`.env`に書いてコード中にベタ書きしないのは認証情報の不用意な流出を防ぐためです
 
