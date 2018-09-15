let myQuery = require('./myQuery');

// TODO PlayerStructure

const findPlayerStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerStructure', query, callback);
}

const insertPlayerStructure = (playerId, structureUniqueId, structureId, level, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, structureId: structureId, level: level };
    myQuery.insertOne('PlayerStructure', obj, callback);
}

const deletePlayerStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    myQuery.deleteOne('PlayerStructure', query, callback);
}

const deletePlayerStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerStructure', query, callback);
}

const updatePlayerStructure = (playerId, structureUniqueId, structureId, level, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { structureId: structureId, level: level } };
    myQuery.updateOne('PlayerStructure', query, values, callback);
}