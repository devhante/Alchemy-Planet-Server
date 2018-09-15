let myQuery = require('./myQuery');

// TODO PlayerRequest

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