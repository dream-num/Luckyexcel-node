const fs = require("fs");
const LuckyExcel = require('luckyexcel');

const fn_luckyexcel = async (ctx, next) => {

    let resultData = null;

    console.info('111')
    await transformExcel().then((exportJson)=>{
        console.info('55555')
        resultData = exportJson
    }).catch((err)=>{
        ctx.response.status = 201
    })

    console.info('6666')
    if (resultData) {
        ctx.response.body = resultData;
    }
    else {
        ctx.response.status = 204;
    }

};

const transformExcel = function() {
    return new Promise((resolve, reject) => {
        console.info('2222')
        fs.readFile("House cleaning checklist.xlsx", (err, data) => {
            console.info('3333')
            if (err) {
                reject(e);
                throw err
            };
    
            LuckyExcel.transformExcelToLucky(data, (exportJson, luckysheetfile) => {
                console.info('4444')
                resolve(exportJson);
            });
    
        });

    });
}

module.exports = {
    'GET /luckyexcel': fn_luckyexcel
};