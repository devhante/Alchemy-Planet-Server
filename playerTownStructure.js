let myQuery = require('./myQuery');

// TODO PlayerTownStructure

const findPlayerTownStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerTownStructure', query, callback);
}

const insertPlayerTownStructure = (playerId, structureUniqueId, position, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, position: position };
    myQuery.insertOne('PlayerTownStructure', obj, callback);
}

const deletePlayerTownStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    myQuery.deleteOne('PlayerTownStructure', query, callback);
}

const deletePlayerTownStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerTownStructure', query, callback);
}

const updatePlayerTownStructure = (playerId, structureUniqueId, position, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { position: position } };
    myQuery.updateOne('PlayerTownStructure', query, values, callback);
}