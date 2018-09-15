let myQuery = require('./myQuery');

exports.onMessageFindPlayerItems = (ws, data) => {
    findPlayerItems(data.playerId, (res) => {
        let dataObj;
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, itemId: res[i].itemId }
        }
        let sendObj = { status: 'PlayerItem', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertPlayerItem = (ws, data) => {
    insertPlayerItem(data.playerId, data.itemId, data.number, (res) => {

    });
}

exports.onMessageDeletePlayerItem = (ws, data) => {
    deletePlayerItem(data.playerId, data.itemId, (obj) => {

    });
}

exports.onMessageDeletePlayerItems = (ws, data) => {
    deletePlayerItems(data.playerId, (obj) => {

    });
}

exports.onMessageUpdatePlayerItem = (ws, data) => {
    updatePlayerItem(data.playerId, data.itemId, data.number, (res) => {

    });
}

const findPlayerItems = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerItem', query, callback);
}

const insertPlayerItem = (playerId, itemId, number, callback) => {
    let obj = { playerId: playerId, itemId: itemId, number: number};
    myQuery.insertOne('PlayerItem', obj, callback);
}

const deletePlayerItem = (playerId, itemId, callback) => {
    let query = { playerId: playerId, itemId: itemId };
    myQuery.deleteOne('PlayerItem', query, callback);
}

const deletePlayerItems = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerItem', query, callback);
}

const updatePlayerItem = (playerId, itemId, number, callback) => {
    let query = { playerId: playerId, itemId: itemId };
    let values = { $set: { number: number } };
    myQuery.updateOne('PlayerItem', query, values, callback);
}