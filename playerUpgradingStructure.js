let myQuery = require('./myQuery');

// TODO PlayerUpgradingStructure

const findPlayerUpgradingStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerUpgradingStructure', query, callback);
}

const insertPlayerUpgradingStructure = (playerId, structureUniqueId, startDate, requireTime, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, startDate: startDate, requireTime: requireTime };
    myQuery.insertOne('PlayerUpgradingStructure', obj, callback);
}

const deletePlayerUpgradingStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    myQuery.deleteOne('PlayerUpgradingStructure', query, callback);
}

const deletePlayerUpgradingStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerUpgradingStructure', query, callback);
}

const updatePlayerUpgradingStructure = (playerId, structureUniqueId, startDate, requireTime, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { startDate: startDate, requireTime: requireTime } };
    myQuery.updateOne('PlayerUpgradingStructure', query, values, callback);
}