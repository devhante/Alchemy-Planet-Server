let myQuery = require('./myQuery');

exports.onMessageFindPlayerCharacters = (ws, data) => {
    findPlayerCharacters(data.playerId, (res) => {
        console.log('findPlayerCharacters: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, characterId: res[i].characterId, level: res[i].level, health: res[i].health, speed: res[i].speed, attackPower: res[i].attackPower };
        }
        let sendObj = { status: 'PlayerCharacter', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertPlayerCharacter = (ws, data) => {
    insertPlayerCharacter(data.playerId, data.characterId, data.level, data.health, data.speed, data.attackPower, (res) => {
        console.log('insertPlayerCharacter: ' + res);
    });
}

exports.onMessageDeletePlayerCharacter = (ws, data) => {
    deletePlayerCharacter(data.playerId, data.characterId, (obj) => {
        console.log('deletePlayerCharacter: ', obj);
    });
}

exports.onMessageDeletePlayerCharacters = (ws, data) => {
    deletePlayerCharacters(data.playerId, (obj) => {
        console.log('deletePlayerCharacters: ' + obj);
    });
}

exports.onMessageUpdatePlayerCharacter = (ws, data) => {
    updatePlayerCharacter(data.playerId, data.characterId, data.level, data.health, data.speed, data.attackPower, (res) => {
        console.log('updatePlayerCharacter: ' + res);
    });
}

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

const updatePlayerCharacter = (playerId, characterId, level, health, speed, attackPower, callback) => {
    let query = { playerId: playerId, characterId: characterId };
    let values = { $set: { level: level, health: health, speed: speed, attackPower: attackPower } };
    myQuery.updateOne('PlayerCharacter', query, values, callback);
}