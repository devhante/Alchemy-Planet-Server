let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port : 3000 });

let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/';

console.log('Server running on port 3000');

wss.on('connection', (ws) => {
    console.log('Client connected.');
    ws.on('message', (message) => {
        let obj = JSON.parse(message);
        let data = JSON.parse(obj.data);
        if(obj.status == 'findPlayerName') {
            onMessageFindPlayerName(ws, data);
        } else if(obj.status == 'insertPlayerName') {
            onMessageInsertPlayerName(ws, data);
        } else if(obj.status == 'deletePlayerName') {
            onMessageDeletePlayerName(ws, data);
        } else if(obj.status == 'updatePlayerName') {
            onMessageUpdatePlayerName(ws, data);
        } else if(obj.status == 'findPlayerLevel') {
            onMessageFindPlayerLevel(ws, data);
        } else if(obj.status == 'insertPlayerLevel') {
            onMessageInsertPlayerLevel(ws, data);
        } else if(obj.status == 'deletePlayerLevel') {
            onMessageDeletePlayerLevel(ws, data);
        } else if(obj.status == 'updatePlayerLevel') {
            onMessageUpdatePlayerLevel(ws, data);
        } else if(obj.status == 'findPlayerGoods') {
            onMessageFindPlayerGoods(ws, data);
        } else if(obj.status == 'insertPlayerGoods') {
            onMessageInsertPlayerGoods(ws, data);
        } else if(obj.status == 'deletePlayerGoods') {
            onMessageDeletePlayerGoods(ws, data);
        } else if(obj.status == 'updatePlayerGoods') {
            onMessageUpdatePlayerGoods(ws, data);
        } else if(obj.status == 'findPlayerItems') {
            onMessageFindPlayerItems(ws, data);
        } else if(obj.status == 'insertPlayerItem') {
            onMessageInsertPlayerItem(ws, data);
        } else if(obj.status == 'deletePlayerItem') {
            onMessageDeletePlayerItem(ws, data);
        } else if(obj.status == 'deletePlayerItems') {
            onMessageDeletePlayerItems(ws, data);
        } else if(obj.status == 'updatePlayerItem') {
            onMessageUpdatePlayerItem(ws, data);
        } else if(obj.status == 'findPlayerStructures') {
            onMessageFindPlayerStructures(ws, data);
        } else if(obj.status == 'insertPlayerStructure') {
            onMessageInsertPlayerStructure(ws, data);
        } else if(obj.status == 'deletePlayerStructure') {
            onMessageDeletePlayerStructure(ws, data);
        } else if(obj.status == 'deletePlayerStructures') {
            onMessageDeletePlayerStructures(ws, data);
        } else if(obj.status == 'updatePlayerStructure') {
            onMessageUpdatePlayerStructure(ws, data);
        } else if(obj.status == 'findPlayerTownStructures') {
            onMessageFindPlayerTownStructures(ws, data);
        } else if(obj.status == 'insertPlayerTownStructure') {
            onMessageInsertPlayerTownStructure(ws, data);
        } else if(obj.status == 'deletePlayerTownStructure') {
            onMessageDeletePlayerTownStructure(ws, data);
        } else if(obj.status == 'deletePlayerTownStructures') {
            onMessageDeletePlayerTownStructures(ws, data);
        } else if(obj.status == 'updatePlayerTownStructure') {
            onMessageUpdatePlayerTownStructure(ws, data);
        } else if(obj.status == 'findPlayerUpgradingStructures') {
            onMessageFindPlayerUpgradingStructures(ws, data);
        } else if(obj.status == 'insertPlayerUpgradingStructure') {
            onMessageInsertPlayerUpgradingStructure(ws, data);
        } else if(obj.status == 'deletePlayerUpgradingStructure') {
            onMessageDeletePlayerUpgradingStructure(ws, data);
        } else if(obj.status == 'deletePlayerUpgradingStructures') {
            onMessageDeletePlayerUpgradingStructures(ws, data);
        } else if(obj.status == 'updatePlayerUpgradingStructure') {
            onMessageUpdatePlayerUpgradingStructure(ws, data);
        } else if(obj.status == 'findPlayerCharacters') {
            onMessageFindPlayerCharacters(ws, data);
        } else if(obj.status == 'insertPlayerCharacter') {
            onMessageInsertPlayerCharacter(ws, data);
        } else if(obj.status == 'deletePlayerCharacter') {
            onMessageDeletePlayerCharacter(ws, data);
        } else if(obj.status == 'deletePlayerCharacters') {
            onMessageDeletePlayerCharacters(ws, data);
        } else if(obj.status == 'updatePlayerCharacter') {
            onMessageUpdatePlayerCharacter(ws, data);
        } else if(obj.status == 'findPlayerParties') {
            onMessageFindPlayerParties(ws, data);
        } else if(obj.status == 'insertPlayerParty') {
            onMessageInsertPlayerParty(ws, data);
        } else if(obj.status == 'deletePlayerParty') {
            onMessageDeletePlayerParty(ws, data);
        } else if(obj.status == 'deletePlayerParties') {
            onMessageDeletePlayerParties(ws, data);
        } else if(obj.status == 'updatePlayerParty') {
            onMessageUpdatePlayerParty(ws, data);
        } else if(obj.status == 'findPlayerRequests') {
            onMessageFindPlayerRequests(ws, data);
        } else if(obj.status == 'insertPlayerRequest') {
            onMessageInsertPlayerRequest(ws, data);
        } else if(obj.status == 'deletePlayerRequest') {
            onMessageDeletePlayerRequest(ws, data);
        } else if(obj.status == 'deletePlayerRequests') {
            onMessageDeletePlayerRequests(ws, data);
        }
    });
});

// PlayerName

const onMessageFindPlayerName = (ws, data) => {
    findPlayerName(data.playerId, (res) => {
        let dataObj = { playerId: res.playerId, playerName: res.playerName };
        let sendObj = { status: 'PlayerName', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}
const onMessageInsertPlayerName = (ws, data) => {
    insertPlayerName(data.playerId, data.playerName, (res) => {

    });
}

const onMessageDeletePlayerName = (ws, data) => {
    deletePlayerName(data.playerId, (obj) => {

    });
}

const onMessageUpdatePlayerName = (ws, data) => {
    updatePlayerName(data.playerId, data.playerName, (res) => {

    });
}

// PlayerLevel

const onMessageFindPlayerLevel = (ws, data) => {
    findPlayerLevel(data.playerId, (res) => {
        let dataObj = { playerId: res.playerId, level: res.level, exp: res.exp };
        let sendObj = { status: 'PlayerLevel', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}
const onMessageInsertPlayerLevel = (ws, data) => {
    insertPlayerLevel(data.playerId, data.level, data.exp, (res) => {

    });
}

const onMessageDeletePlayerLevel = (ws, data) => {
    deletePlayerLevel(data.playerId, (obj) => {

    });
}

const onMessageUpdatePlayerLevel = (ws, data) => {
    updatePlayerLevel(data.playerId, data.level, data.exp, (res) => {

    });
}

// PlayerGoods

const onMessageFindPlayerGoods = (ws, data) => {
    findPlayerGoods(data.playerId, (res) => {
        let dataObj = { playerId: res.playerId, uniCoin: res.uniCoin, cosmoStone: res.cosmeStone, oxygenTank: res.oxygenTank };
        let sendObj = { status: 'PlayerGoods', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

const onMessageInsertPlayerGoods = (ws, data) => {
    insertPlayerGoods(data.playerId, data.uniCoin, data.cosmeStone, data.oxygenTank, (res) => {

    });
}

const onMessageDeletePlayerGoods = (ws, data) => {
    deletePlayerGoods(data.playerId, (obj) => {

    });
}

const onMessageUpdatePlayerGoods = (ws, data) => {
    updatePlayerGoods(data.playerId, data.uniCoin, data.cosmeStone, data.oxygenTank, (res) => {

    });
}

// PlayerItems

const onMessageFindPlayerItems = (ws, data) => {
    findPlayerItems(data.playerId, (res) => {
        let dataObj;
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, itemId: res[i].itemId }
        }
        let sendObj = { status: 'PlayerItem', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

const onMessageInsertPlayerItem = (ws, data) => {
    insertPlayerItem(data.playerId, data.itemId, data.number, (res) => {

    });
}

const onMessageDeletePlayerItem = (ws, data) => {
    deletePlayerItem(data.playerId, data.itemId, (obj) => {

    });
}

const onMessageDeletePlayerItems = (ws, data) => {
    deletePlayerItems(data.playerId, (obj) => {

    });
}

const onMessageUpdatePlayerItem = (ws, data) => {
    updatePlayerItem(data.playerId, date.itemId, date.number, (res) => {

    });
}

// TODO PlayerStructure
// TODO PlayerTownStructure
// TODO PlayerUpgradingStructure
// TODO PlayerCharacter
// TODO PlayerParty
// TODO PlayerRequest


const findOne = (collectionName, query, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true}, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).findOne(query, (err, res) => {
            if(err) throw err;
            callback(res);
            db.close();
        });
    });
}

const findMany = (collectionName, query, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).find(query).toArray((err, res) => {
            if(err) throw err;
            callback(res);
            db.close();
        });
    });
}

const insertOne = (collectionName, obj, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).insertOne(obj, (err, res) => {
            if(err) throw err;
            callback(res);
            db.close();
        });
    });
}

const deleteOne = (collectionName, query, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).deleteOne(query, (err, obj) => {
            if(err) throw err;
            callback(obj);
            db.close();
        });
    });
}

const deleteMany = (collectionName, query, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).deleteMany(query, (err, obj) => {
            if(err) throw err;
            callback(obj);
            db.close();
        });
    });
}

const updateOne = (collectionName, query, values, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).updateOne(query, values, (err, res) => {
            if(err) throw err;
            callback(res);
            db.close();
        });
    });
}

// PlayerName

const findPlayerName = (playerId, callback) => {
    let query = { playerId: playerId };
    findOne('PlayerName', query, callback);
}

const insertPlayerName = (playerId, playerName, callback) => {
    let obj = { playerId: playerId, playerName: playerName };
    insertOne('PlayerName', obj, callback);
}

const deletePlayerName = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteOne('PlayerName', query, callback);
}

const updatePlayerName = (playerId, playerName, callback) => {
    let query = { playerId: playerId };
    let values = { $set: { playerName: playerName } };
    updateOne('PlayerName', query, values, callback);
}

// PlayerLevel

const findPlayerLevel = (playerId, callback) => {
    let query = { playerId: playerId };
    findOne('PlayerLevel', query, callback);
}

const insertPlayerLevel = (playerId, level, exp, callback) => {
    let obj = { playerId: playerId, level: level, exp: exp };
    insertOne('PlayerLevel', obj, callback);
}

const deletePlayerLevel = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteOne('PlayerLevel', query, callback);
}

const updatePlayerLevel = (playerId, level, exp, callback) => {
    let query = { playerId: playerId };
    let values = { $set: { level: level, exp: exp } };
    updateOne('PlayerLevel', query, values, callback);
}

// PlayerGoods

const findPlayerGoods = (playerId, callback) => {
    let query = { playerId: playerId };
    findOne('PlayerGoods', query, callback);
}

const insertPlayerGoods = (playerId, uniCoin, cosmoStone, oxygenTank, callback) => {
    let obj = { playerId: playerId, uniCoin: uniCoin, cosmoStone: cosmoStone, oxygenTank: oxygenTank };
    insertOne('PlayerGoods', obj, callback);
}

const deletePlayerGoods = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteOne('PlayerGoods', query, callback);
}

const updatePlayerGoods = (playerId, uniCoin, cosmeStone, oxygenTank, callback) => {
    let query = { playerId: playerId };
    let values = { $set: { uniCoin: uniCoin, cosmeStone: cosmeStone, oxygenTank: oxygenTank } };
    updateOne('PlayerGoods', query, values, callback);
}

// PlayerItems

const findPlayerItems = (playerId, callback) => {
    let query = { playerId: playerId };
    findMany('PlayerItem', query, callback);
}

const insertPlayerItem = (playerId, itemId, number, callback) => {
    let obj = { playerId: playerId, itemId: itemId, number: number};
    insertOne('PlayerItem', obj, callback);
}

const deletePlayerItem = (playerId, itemId, callback) => {
    let query = { playerId: playerId, itemId: itemId };
    deleteOne('PlayerItem', query, callback);
}

const deletePlayerItems = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteMany('PlayerItem', query, callback);
}

const updatePlayerItem = (playerId, itemId, number, callback) => {
    let query = { playerId: playerId, itemId: itemId };
    let values = { $set: { number: number } };
    updateOne('PlayerItem', query, values, callback);
}

// PlayerStructure

const findPlayerStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    findMany('PlayerStructure', query, callback);
}

const insertPlayerStructure = (playerId, structureUniqueId, structureId, level, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, structureId: structureId, level: level };
    insertOne('PlayerStructure', obj, callback);
}

const deletePlayerStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    deleteOne('PlayerStructure', query, callback);
}

const deletePlayerStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteMany('PlayerStructure', query, callback);
}

const updatePlayerStructure = (playerId, structureUniqueId, structureId, level, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { structureId: structureId, level: level } };
    updateOne('PlayerStructure', query, values, callback);
}

// PlayerTownStructure

const findPlayerTownStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    findMany('PlayerTownStructure', query, callback);
}

const insertPlayerTownStructure = (playerId, structureUniqueId, position, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, position: position };
    insertOne('PlayerTownStructure', obj, callback);
}

const deletePlayerTownStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    deleteOne('PlayerTownStructure', query, callback);
}

const deletePlayerTownStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteMany('PlayerTownStructure', query, callback);
}

const updatePlayerTownStructure = (playerId, structureUniqueId, position, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { position: position } };
    updateOne('PlayerTownStructure', query, values, callback);
}

// PlayerUpgradingStructure

const findPlayerUpgradingStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    findMany('PlayerUpgradingStructure', query, callback);
}

const insertPlayerUpgradingStructure = (playerId, structureUniqueId, startDate, requireTime, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, startDate: startDate, requireTime: requireTime };
    insertOne('PlayerUpgradingStructure', obj, callback);
}

const deletePlayerUpgradingStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    deleteOne('PlayerUpgradingStructure', query, callback);
}

const deletePlayerUpgradingStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteMany('PlayerUpgradingStructure', query, callback);
}

const updatePlayerUpgradingStructure = (playerId, structureUniqueId, startDate, requireTime, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { startDate: startDate, requireTime: requireTime } };
    updateOne('PlayerUpgradingStructure', query, values, callback);
}

// PlayerCharacter

const findPlayerCharacters = (playerId, callback) => {
    let query = { playerId: playerId };
    findMany('PlayerCharacter', query, callback);
}

const insertPlayerCharacter = (playerId, characterId, level, health, speed, attackPower, callback) => {
    let obj = { playerId: playerId, characterId: characterId, level: level, health: health, speed: speed, attackPower: attackPower };
    insertOne('PlayerCharacter', obj, callback);
}

const deletePlayerCharacter = (playerId, characterId, callback) => {
    let query = { playerId: playerId, characterId: characterId };
    deleteOne('PlayerCharacter', query, callback);
}

const deletePlayerCharacters = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteMany('PlayerCharacter', query, callback);
}

const updatePlayerName = (playerId, characterId, level, health, speed, attackPower, callback) => {
    let query = { playerId: playerId, characterId: characterId };
    let values = { $set: { level: level, health: health, speed: speed, attackPower: attackPower } };
    updateOne('PlayerCharacter', query, values, callback);
}

// PlayerParty

const findPlayerParties = (playerId, callback) => {
    let query = { playerId: playerId };
    findMany('PlayerParty', query, callback);
}

const insertPlayerParty = (playerId, partyIndex, slotIndex, characterId, callback) => {
    let obj = { playerId: playerId, partyIndex: partyIndex, slotIndex: slotIndex, characterId: characterId };
    insertOne('PlayerParty', obj, callback);
}

const deletePlayerParty = (playerId, partyIndex, slotIndex, callback) => {
    let query = { playerId: playerId, partyIndex: partyIndex, slotIndex: slotIndex };
    deleteOne('PlayerParty', query, callback);
}

const deletePlayerParties = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteMany('PlayerParty', query, callback);
}

const updatePlayerParty = (playerId, partyIndex, slotIndex, characterId, callback) => {
    let query = { playerId: playerId, partyIndex: partyIndex, slotIndex: slotIndex };
    let values = { $set: { characterId: characterId } };
    updateOne('PlayerParty', query, values, callback);
}

// PlayerRequest
 
const findPlayerRequests = (playerId, callback) => {
    let query = { playerId: playerId };
    findMany('PlayerRequest', query, callback);
}

const insertPlayerRequest = (playerId, requestId, callback) => {
    let obj = { playerId: playerId, requestId: requestId };
    insertOne('PlayerRequest', obj, callback);
}

const deletePlayerRequest = (playerId, requestId, callback) => {
    let query = { playerId: playerId, requestId: requestId };
    deleteOne('PlayerRequest', query, callback);
}

const deletePlayerRequests = (playerId, callback) => {
    let query = { playerId: playerId };
    deleteMany('PlayerRequest', query, callback);
}

// DROP

// MongoClient.connect(url, { useNewUrlParser:true }, (err, db) => {
//     if(err) throw err;
//     let dbo = db.db('mydb');
//     dbo.collection('StructureUpgradeInfo').drop((err, ok) => {
//         if(err) throw err;
//         if(ok) console.log('dropped.');
//         db.close();
//     });
// });