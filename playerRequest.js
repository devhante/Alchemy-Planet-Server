let myQuery = require('./myQuery');

exports.onMessageFindPlayerRequests = (ws, data) => {
    findPlayerRequests(data.playerId, (res) => {
        console.log('findPlayerRequests: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, requestId: res[i].requestId };
        }
        let sendObj = { status: 'PlayerRequest', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertPlayerRequest = (ws, data) => {
    insertPlayerRequest(data.playerId, data.requestId, (res) => {
        console.log('insertPlayerRequest: ' + res);
    });
}

exports.onMessageDeletePlayerRequest = (ws, data) => {
    deletePlayerRequest(data.playerId, data.requestId, (obj) => {
        console.log('deletePlayerRequest: ' + obj);
    });
}

exports.onMessageDeletePlayerRequests = (ws, data) => {
    deletePlayerRequests(data.playerId, (obj) => {
        console.log('deletePlayerRequests: ' + obj );
    });
}

const findPlayerRequests = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerRequest', query, callback);
}

const insertPlayerRequest = (playerId, requestId, callback) => {
    let obj = { playerId: playerId, requestId: requestId };
    myQuery.insertOne('PlayerRequest', obj, callback);
}

const deletePlayerRequest = (playerId, requestId, callback) => {
    let query = { playerId: playerId, requestId: requestId };
    myQuery.deleteOne('PlayerRequest', query, callback);
}

const deletePlayerRequests = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerRequest', query, callback);
}