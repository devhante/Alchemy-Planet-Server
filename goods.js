let myQuery = require('./myQuery');

exports.onMessageFindGoods = (ws, data) => {
    findGoods(data.playerId, (res) => {
        let dataObj = { playerId: res.playerId, uniCoin: res.uniCoin, cosmoStone: res.cosmoStone, oxygenTank: res.oxygenTank };
        let sendObj = { status: 'Goods', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertGoods = (ws, data) => {
    insertGoods(data.playerId, data.uniCoin, data.cosmoStone, data.oxygenTank, (res) => {
        console.log('insertGoods: ' + res);
    });
}

exports.onMessageDeleteGoods = (ws, data) => {
    deleteGoods(data.playerId, (obj) => {
        console.log('deleteGoods: ' + obj);
    });
}

exports.onMessageUpdateGoods = (ws, data) => {
    updateGoods(data.playerId, data.uniCoin, data.cosmoStone, data.oxygenTank, (res) => {
        console.log('updateGoods: ' + res);
    });
}

const findGoods = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findOne('Goods', query, callback);
}

const insertGoods = (playerId, uniCoin, cosmoStone, oxygenTank, callback) => {
    let obj = { playerId: playerId, uniCoin: uniCoin, cosmoStone: cosmoStone, oxygenTank: oxygenTank };
    myQuery.insertOne('Goods', obj, callback);
}

const deleteGoods = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteOne('Goods', query, callback);
}

const updateGoods = (playerId, uniCoin, cosmoStone, oxygenTank, callback) => {
    let query = { playerId: playerId };
    let values = { $set: { uniCoin: uniCoin, cosmoStone: cosmoStone, oxygenTank: oxygenTank } };
    myQuery.updateOne('Goods', query, values, callback);
}