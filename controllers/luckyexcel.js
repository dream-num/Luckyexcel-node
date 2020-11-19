const fs = require("fs");
const LuckyExcel = require('luckyexcel');

const fn_luckyexcel = async (ctx, next) => {

    let resultData = null;

    await transformExcel().then((exportJson)=>{
        resultData = exportJson
    }).catch((err)=>{
        ctx.response.status = 201
    })

    if (resultData) {
        ctx.response.body = resultData;
    }
    else {
        ctx.response.status = 204;
    }

};

const transformExcel = function() {
    return new Promise((resolve, reject) => {
        fs.readFile("House cleaning checklist.xlsx", (err, data) => {
            if (err) {
                reject(e);
                throw err
            };
    
            LuckyExcel.transformExcelToLucky(data, (exportJson, luckysheetfile) => {
                resolve(exportJson);
            });
    
        });

    });
}

module.exports = {
    'GET /luckyexcel': fn_luckyexcel
};