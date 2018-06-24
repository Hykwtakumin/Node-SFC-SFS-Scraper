import 'dotenv/config';
import * as client from 'cheerio-httpcli';


const sfsAddr = 'https://vu.sfc.keio.ac.jp/sfc-sfs/';

client.fetch(sfsAddr)
    .then(result => {
        const signIn_Info = {
            u_login: process.env.SFS_USER,
            u_pass: process.env.SFS_PASS
        };
        console.log(signIn_Info);
        result.$('form')
            .submit(signIn_Info)
            .then(result => {
                console.log("succeeded Sign In!");
            }).catch(error => {
            console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    });