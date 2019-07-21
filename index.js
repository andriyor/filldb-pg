const parser = require('pg-query-parser');
const faker = require("faker");

function getDataSchema(sqlQuery) {
    const parsedQuery = parser.parse(sqlQuery).query;
    const tableName = parsedQuery[0].CreateStmt.relation.RangeVar.relname;
    const tableCols = parsedQuery[0].CreateStmt.tableElts;
    tableCols.shift();
    const dataSchema = {};
    for (col of tableCols) {
        const colname = col.ColumnDef.colname;
        if (colname.includes('mail')) {
            dataSchema[colname] = "{{internet.email}}";
        }
        if (colname.includes('first') && colname.includes('name')) {
            dataSchema[colname] = "{{name.firstName}}";
        }
        if (colname.includes('last') && colname.includes('name')) {
            dataSchema[colname] = "{{name.lastName}}";
        }
    }
    return {table_name: tableName, data: dataSchema}
}

function getFakedData(dataSchema) {
    const fakedData = {};
    for (i in dataSchema) {
        fakedData[i] = faker.fake(dataSchema[i]);
    }
    return fakedData;
}

function getDtaValues(dataSchema) {
    const lengthKeys = Object.keys(dataSchema).length;
    const dataValues = [];
    for (let i = 1; i <= lengthKeys; i++) {
        dataValues.push(`$${i} `);
    }
    return dataValues.join(",")
}

const fillFake = (client, sqlQuery, numRows) => {
    const dataSchema = getDataSchema(sqlQuery);
    const dataValues = getDtaValues(dataSchema.data);
    const dataKeys = Object.keys(dataSchema.data).join(",");
    for (let i = 0; i < numRows; i++) {
        const query = `INSERT INTO ${dataSchema.table_name}(${dataKeys}) VALUES (${dataValues})`;
        const fakedData = getFakedData(dataSchema.data);
        const values = Object.values(fakedData);
        client.query(query, values)
    }
};

module.exports = {
    fillFake
};
