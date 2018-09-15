let myQuery = require('./myQuery');

exports.onMessageFindPlayerLevel = (ws, data) => {
    findPlayerLevel(data.playerId, (res) => {
        let dataObj = { playerId: res.playerId, level: res.level, exp: res.exp };
        let sendObj = { status: 'PlayerLevel', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}
exports.onMessageInsertPlayerLevel = (ws, data) => {
    insertPlayerLevel(data.playerId, data.level, data.exp, (res) => {

    });
}

exports.onMessageDeletePlayerLevel = (ws, data) => {
    deletePlayerLevel(data.playerId, (obj) => {

    });
}

exports.onMessageUpdatePlayerLevel = (ws, data) => {
    updatePlayerLevel(data.playerId, data.level, data.exp, (res) => {

    });
}

const findPlayerLevel = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findOne('PlayerLevel', query, callback);
}

const insertPlayerLevel = (playerId, level, exp, callback) => {
    let obj = { playerId: playerId, level: level, exp: exp };
    myQuery.insertOne('PlayerLevel', obj, callback);
}

const deletePlayerLevel = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteOne('PlayerLevel', query, callback);
}

const updatePlayerLevel = (playerId, level, exp, callback) => {
    let query = { playerId: playerId };
    let values = { $set: { level: level, exp: exp } };
    myQuery.updateOne('PlayerLevel', query, values, callback);
}