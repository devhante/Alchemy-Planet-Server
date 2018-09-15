let myQuery = require('./myQuery');

exports.onMessageFindPlayerGoods = (ws, data) => {
    findPlayerGoods(data.playerId, (res) => {
        let dataObj = { playerId: res.playerId, uniCoin: res.uniCoin, cosmoStone: res.cosmoStone, oxygenTank: res.oxygenTank };
        let sendObj = { status: 'PlayerGoods', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertPlayerGoods = (ws, data) => {
    insertPlayerGoods(data.playerId, data.uniCoin, data.cosmeStone, data.oxygenTank, (res) => {

    });
}

exports.onMessageDeletePlayerGoods = (ws, data) => {
    deletePlayerGoods(data.playerId, (obj) => {

    });
}

exports.onMessageUpdatePlayerGoods = (ws, data) => {
    updatePlayerGoods(data.playerId, data.uniCoin, data.cosmeStone, data.oxygenTank, (res) => {

    });
}

const findPlayerGoods = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findOne('PlayerGoods', query, callback);
}

const insertPlayerGoods = (playerId, uniCoin, cosmoStone, oxygenTank, callback) => {
    let obj = { playerId: playerId, uniCoin: uniCoin, cosmoStone: cosmoStone, oxygenTank: oxygenTank };
    myQuery.insertOne('PlayerGoods', obj, callback);
}

const deletePlayerGoods = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteOne('PlayerGoods', query, callback);
}

const updatePlayerGoods = (playerId, uniCoin, cosmoStone, oxygenTank, callback) => {
    let query = { playerId: playerId };
    let values = { $set: { uniCoin: uniCoin, cosmoStone: cosmoStone, oxygenTank: oxygenTank } };
    myQuery.updateOne('PlayerGoods', query, values, callback);
}