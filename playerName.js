let myQuery = require('./myQuery');

exports.onMessageFindPlayerName = (ws, data) => {
    findPlayerName(data.playerId, (res) => {
        console.log('findPlayerName: ' + res);
        let dataObj = { playerId: res.playerId, playerName: res.playerName };
        let sendObj = { status: 'PlayerName', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertPlayerName = (ws, data) => {
    insertPlayerName(data.playerId, data.playerName, (res) => {
        console.log('insertPlayerName: ' + res);
    });
}

exports.onMessageDeletePlayerName = (ws, data) => {
    deletePlayerName(data.playerId, (obj) => {
        console.log('deletePlayerName: ' + obj);
    });
}

exports.onMessageUpdatePlayerName = (ws, data) => {
    updatePlayerName(data.playerId, data.playerName, (res) => {
        console.log('updatePlayerName: ' + res)
    });
}

const findPlayerName = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findOne('PlayerName', query, callback);
}

const insertPlayerName = (playerId, playerName, callback) => {
    let obj = { playerId: playerId, playerName: playerName };
    myQuery.insertOne('PlayerName', obj, callback);
}

const deletePlayerName = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteOne('PlayerName', query, callback);
}

const updatePlayerName = (playerId, playerName, callback) => {
    let query = { playerId: playerId };
    let values = { $set: { playerName: playerName } };
    myQuery.updateOne('PlayerName', query, values, callback);
}