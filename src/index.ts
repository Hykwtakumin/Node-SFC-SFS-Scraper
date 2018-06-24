import 'dotenv/config';
import * as client from 'cheerio-httpcli';

//SFC-SFSのアドレス
const sfsAddr = process.env.SFS_URL;
//ログイン情報
const signIn_Info = {
    u_login: process.env.SFS_USER,
    u_pass: process.env.SFS_PASS
};

//async-awaitを使うとコールバック地獄を回避可能
async function signIn() {
    //ログイン前のページ
    const topPage = await client.fetch(sfsAddr);
    //ログイン情報をformに入力して送信する
    topPage.$('form').submit(signIn_Info)
        .then(async (result) => {
            //ログインに成功した場合
            console.log("succeeded Sign In!");
            //ログイン後のページへのリンクを切り出す(もっと良い方法があるはず)
            const successURL = result.body.indexOf("https://");
            const successURLEnd = result.body.indexOf("\"></head></");
            //無理矢理URLを切り出してる(もっと良い方法があるはず)
            const signInLink = result.body.slice(successURL, successURLEnd);
            console.log(signInLink);

            //切り出しに成功したらログイン後のページを返す
            const signedInPage = await client.fetch(signInLink);
            // signedInPage.$("#navigation > div:nth-child(2) > a").val();
            //ログイン後の"MY時間割"ページにアクセスする
            const myTimeTable = await signedInPage.$("#navigation > div:nth-child(2) > a").click();
            //時間割のタイトルだけ取ってくる(h4要素でclassが"one"のモノ)
            const myTimeTableTitle = myTimeTable.$("h4.one").text();
            //コンソールに表示(MY時間割－20XXZ学期（確定))
            console.log(myTimeTableTitle);

            //時間割表を走査していく(表はどうもiframeらしい)
            //TODO iframeをどう取得するか考え中...
            const iframeURL = myTimeTable.$("frame_set");

        }).catch(error => {
        //ログインに失敗した場合
        console.log(error)
    })
}

//関数を実行
signIn();
