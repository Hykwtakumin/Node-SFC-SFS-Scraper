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
	topPage
		.$('form')
		.submit(signIn_Info)
		.then(async result => {
			//ログインに成功した場合
			console.log('succeeded Sign In!');
			//ログイン後のページへのリンクを切り出す(もっと良い方法があるはず)
			const specificIdStart = result.body.indexOf('id=');
			const specificIdEnd = result.body.indexOf('&type=s&mode=0');
			//無理矢理URLを切り出してる(もっと良い方法があるはず)
			const specificId = result.body.slice(specificIdStart, specificIdEnd);
			const timeTableLink = `https://vu.sfc.keio.ac.jp/sfc-sfs/sfs_class/student/view_timetable.cgi?${specificId}&type=s&mode=1&lang=ja`;
			//iframeの内容
			const timeTable = await client.fetch(timeTableLink);
			//時間割のtableから授業へのリンクを抽出する
            const courseLinks = timeTable.$('table').find('a');
            // console.log(courseLinks);
            const courseLinkArray : Array<string> = [];

            courseLinks.each( async (index, element) => {
                const link = element.attribs.href;
                courseLinkArray.push(link);
            });

            console.log(courseLinkArray);

            //授業ページに順次アクセスし、課題へのリンクを取得する
            courseLinkArray.forEach( async (item) => {
                //一応URLとしてエンコードしておく
                const link = encodeURI(item);
                //アクセスしてくる
                const coursePage = await client.fetch(item);
                //課題のリンクを取得する
                coursePage.$('td').find('a').each(async (index, element) => {
                    //個別の課題のリンク
                    const assignment =  element.attribs.href;
                })
            });
		})
		.catch(error => {
			//ログインに失敗した場合
			console.log(error);
		});
}

//関数を実行
signIn();
