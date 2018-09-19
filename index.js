let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port : 3000 });

exports.MongoClient = require('mongodb').MongoClient;
exports.url = 'mongodb://localhost:27017/';

console.log('Server running on port 3000');

let name = require('./name');
let level = require('./level');
let goods = require('./goods');
let item = require('./item');
let structure = require('./structure');
let townStructure = require('./townStructure');
let upgradingStructure = require('./upgradingStructure');
let character = require('./character');
let party = require('./party');
let request = require('./request');

wss.on('connection', (ws) => {
    console.log('Client connected.');
    ws.on('message', (message) => {
        let obj = JSON.parse(message);
        let data = JSON.parse(obj.data);

        switch(obj.status) {
            case 'findPlayerName': name.onMessageFindName(ws, data); break;
            case 'insertName': name.onMessageInsertName(ws, data); break;
            case 'deleteName': name.onMessageDeleteName(ws, data); break;
            case 'updateName': name.onMessageUpdateName(ws, data); break;

            case 'findLevel': level.onMessageFindLevel(ws, data); break;
            case 'insertLevel': level.onMessageInsertLevel(ws, data); break;
            case 'deleteLevel': level.onMessageDeleteLevel(ws, data); break;
            case 'updateLevel': level.onMessageUpdateLevel(ws, data); break;

            case 'findGoods': goods.onMessageFindGoods(ws, data); break;
            case 'insertGoods': goods.onMessageInsertGoods(ws, data); break;
            case 'deleteGoods': goods.onMessageDeleteGoods(ws, data); break;
            case 'updateGoods': goods.onMessageUpdateGoods(ws, data); break;

            case 'findItems': item.onMessageFindItems(ws, data); break;
            case 'insertItem': item.onMessageInsertItem(ws, data); break;
            case 'deleteItem': item.onMessageDeleteItem(ws, data); break;
            case 'deleteItems': item.onMessageDeleteItems(ws, data); break;
            case 'updateItem': item.onMessageUpdateItem(ws, data); break;

            case 'findStructures': structure.onMessageFindStructures(ws, data); break;
            case 'insertStructure': structure.onMessageInsertStructure(ws, data); break;
            case 'deleteStructure': structure.onMessageDeleteStructure(ws, data); break;
            case 'deleteStructures': structure.onMessageDeleteStructures(ws, data); break;
            case 'updateStructure': structure.onMessageUpdateStructure(ws, data); break;

            case 'findCharacters': character.onMessageFindCharacters(ws, data); break;
            case 'insertCharacter': character.onMessageInsertCharacter(ws, data); break;
            case 'deleteCharacter': character.onMessageDeleteCharacter(ws, data); break;
            case 'deleteCharacters': character.onMessageDeleteCharacters(ws, data); break;
            case 'updateCharacter': character.onMessageUpdateCharacter(ws, data); break;

            case 'findParties': party.onMessageFindParties(ws, data); break;
            case 'insertParty': party.onMessageInsertParty(ws, data); break;
            case 'deleteParty': party.onMessageDeleteParty(ws, data); break;
            case 'deleteParties': party.onMessageDeleteParties(ws, data); break;
            case 'updateParty': party.onMessageUpdateParty(ws, data); break;

            case 'findRequests': request.onMessageFindRequests(ws, data); break;
            case 'insertRequest': request.onMessageInsertRequest(ws, data); break;
            case 'deleteRequest': request.onMessageDeleteRequest(ws, data); break;
            case 'deleteRequests': request.onMessageDeleteRequests(ws, data); break;

            case 'dropCollection': onMessageDropCollection(ws, data); break;
        }
    });
});

// DROP

const onMessageDropCollection = (ws, data) => {
    exports.MongoClient.connect(exports.url, { useNewUrlParser:true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(data).drop((err, ok) => {
            if(err) throw err;
            if(ok) console.log(data + ' dropped.');
            db.close();
        });
    });
}

// exports.MongoClient.connect(exports.url, { useNewUrlParser:true }, (err, db) => {
//     if(err) throw err;
//     let dbo = db.db('mydb');
//     dbo.collection('PlayerName').drop((err, ok) => {
//         if(err) throw err;
//         console.log('dropped.');
//         db.close();
//     });
// });