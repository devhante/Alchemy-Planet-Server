let myQuery = require('./myQuery');

// TODO PlayerCharacter

const findPlayerCharacters = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerCharacter', query, callback);
}

const insertPlayerCharacter = (playerId, characterId, level, health, speed, attackPower, callback) => {
    let obj = { playerId: playerId, characterId: characterId, level: level, health: health, speed: speed, attackPower: attackPower };
    myQuery.insertOne('PlayerCharacter', obj, callback);
}

const deletePlayerCharacter = (playerId, characterId, callback) => {
    let query = { playerId: playerId, characterId: characterId };
    myQuery.deleteOne('PlayerCharacter', query, callback);
}

const deletePlayerCharacters = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerCharacter', query, callback);
}

const updatePlayerName = (playerId, characterId, level, health, speed, attackPower, callback) => {
    let query = { playerId: playerId, characterId: characterId };
    let values = { $set: { level: level, health: health, speed: speed, attackPower: attackPower } };
    myQuery.updateOne('PlayerCharacter', query, values, callback);
}