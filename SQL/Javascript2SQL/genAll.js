// Concat SQL Code into Javascript String

const gen_sql_str = require("./genSqlStr");

// Generate Sql Statement String
const path = require('path');
let fileNameDir = path.join(__dirname, '..', 'NTL System', 'Models');
const sql_js_str = gen_sql_str(fileNameDir);

// const sql_js_str = `
// DROP TABLE dbo.tblMovie;

// CREATE TABLE dbo.tblMovie(
//     movie_id INT IDENTITY(1, 1),
//     name VARCHAR(MAX),
//     CONSTRAINT movie_id_pk PRIMARY KEY (movie_id)  
// );
// `;

// Generate Dictionary
const gen_sql_dict = require("./genSqlDict");

// Function to generate procedure
const gen_select_all = require("./genSelectAll");
const gen_select_by_pk = require("./genSelectByPk");
const gen_insert = require("./genInsert");
const gen_update = require("./genUpdate");
const gen_delete = require("./genDelete");

// Declare Variables to be used
const sql_dict = gen_sql_dict(sql_js_str);

const table_arr = sql_js_str.match(/CREATE TABLE (.|\n)+?\);/g);

// const func_arr = [gen_select_all, gen_select_by_pk, gen_insert, gen_update, gen_delete];
// const comment_arr = ["Select All", "Select By PK", "Insert New Record", "Update Existing Record", "Delete Record"].map(x => `Stored Procedure: ${x}`);

const func_arr = [gen_insert, gen_update, gen_delete];
const comment_arr = ["Insert New Record", "Update Existing Record", "Delete Record"].map(x => `Stored Procedure: ${x}`);

// Lambda
f = x => {
    return x.split("TShopee")[1].replace(/([a-z])([A-Z])/g, '$1 $2');;
};

for (let ind in Object.keys(sql_dict)) {
    let key = Object.keys(sql_dict)[ind];
    let table_stmt = table_arr[ind];
    let table_name = key;
    let arr = sql_dict[table_name];

    // console.log(`${+ind + 1}. ${f(table_name)}`);

    console.log(table_stmt);

    func_arr.forEach((func, ind) => {

        // Comment Before Each procedure
        console.log(`\n-- ${comment_arr[ind]}`)

        let str = func(table_name, arr);

        // Remove Tab Spaces
        console.log(str.replace(/\n[ ]{4,}/g, "\n"));
    });

    console.log();

    // console.log(`DELETE FROM dbo.${table_name};`);
}