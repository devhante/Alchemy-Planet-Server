let myQuery = require('./myQuery');

exports.onMessageFindItems = (ws, data) => {
    findItems(data.playerId, (res) => {
        console.log('findItems: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, itemId: res[i].itemId, number: res[i].number };
        }
        let sendObj = { status: 'Item', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertItem = (ws, data) => {
    insertItem(data.playerId, data.itemId, data.number, (res) => {
        console.log('insertItem: ' + res);
    });
}

exports.onMessageDeleteItem = (ws, data) => {
    deleteItem(data.playerId, data.itemId, (obj) => {
        console.log('deleteItem: ' + obj);
    });
}

exports.onMessageDeleteItems = (ws, data) => {
    deleteItems(data.playerId, (obj) => {
        console.log('deleteItems: ' + obj);
    });
}

exports.onMessageUpdateItem = (ws, data) => {
    updateItem(data.playerId, data.itemId, data.number, (res) => {
        console.log('updateItem: ' + res);
    });
}

const findItems = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('Item', query, callback);
}

const insertItem = (playerId, itemId, number, callback) => {
    let obj = { playerId: playerId, itemId: itemId, number: number};
    myQuery.insertOne('Item', obj, callback);
}

const deleteItem = (playerId, itemId, callback) => {
    let query = { playerId: playerId, itemId: itemId };
    myQuery.deleteOne('Item', query, callback);
}

const deleteItems = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('Item', query, callback);
}

const updateItem = (playerId, itemId, number, callback) => {
    let query = { playerId: playerId, itemId: itemId };
    let values = { $set: { number: number } };
    myQuery.updateOne('Item', query, values, callback);
}