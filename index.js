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
let character = require('./character');
let party = require('./party');
let request = require('./request');

wss.on('connection', (ws) => {
    console.log('Client connected.');
    ws.on('message', (message) => {
        let obj = JSON.parse(message);
        let data = JSON.parse(obj.data);

        let code = obj.status.substring(0, 3);

        switch(code) {
            case '110': name.onMessageFindName(ws, data, obj.status); break;
            case '120': name.onMessageInsertName(ws, data, obj.status); break;
            case '130': name.onMessageDeleteName(ws, data, obj.status); break;
            case '140': name.onMessageUpdateName(ws, data, obj.status); break;

            case '210': level.onMessageFindLevel(ws, data, obj.status); break;
            case '220': level.onMessageInsertLevel(ws, data, obj.status); break;
            case '230': level.onMessageDeleteLevel(ws, data, obj.status); break;
            case '240': level.onMessageUpdateLevel(ws, data, obj.status); break;

            case '310': goods.onMessageFindGoods(ws, data, obj.status); break;
            case '320': goods.onMessageInsertGoods(ws, data, obj.status); break;
            case '330': goods.onMessageDeleteGoods(ws, data, obj.status); break;
            case '340': goods.onMessageUpdateGoods(ws, data, obj.status); break;

            case '410': item.onMessageFindItems(ws, data, obj.status); break;
            case '420': item.onMessageInsertItem(ws, data, obj.status); break;
            case '430': item.onMessageDeleteItem(ws, data, obj.status); break;
            case '431': item.onMessageDeleteItems(ws, data, obj.status); break;
            case '440': item.onMessageUpdateItem(ws, data, obj.status); break;

            case '510': structure.onMessageFindStructures(ws, data, obj.status); break;
            case '520': structure.onMessageInsertStructure(ws, data, obj.status); break;
            case '530': structure.onMessageDeleteStructure(ws, data, obj.status); break;
            case '531': structure.onMessageDeleteStructures(ws, data, obj.status); break;
            case '540': structure.onMessageUpdateStructure(ws, data, obj.status); break;

            case '610': character.onMessageFindCharacters(ws, data, obj.status); break;
            case '620': character.onMessageInsertCharacter(ws, data, obj.status); break;
            case '630': character.onMessageDeleteCharacter(ws, data, obj.status); break;
            case '631': character.onMessageDeleteCharacters(ws, data, obj.status); break;
            case '640': character.onMessageUpdateCharacter(ws, data, obj.status); break;

            case '710': party.onMessageFindParties(ws, data, obj.status); break;
            case '720': party.onMessageInsertParty(ws, data, obj.status); break;
            case '730': party.onMessageDeleteParty(ws, data, obj.status); break;
            case '731': party.onMessageDeleteParties(ws, data, obj.status); break;
            case '740': party.onMessageUpdateParty(ws, data, obj.status); break;

            case '810': request.onMessageFindRequests(ws, data, obj.status); break;
            case '820': request.onMessageInsertRequest(ws, data, obj.status); break;
            case '830': request.onMessageDeleteRequest(ws, data, obj.status); break;
            case '831': request.onMessageDeleteRequests(ws, data, obj.status); break;

            case '900': onMessageDropCollection(ws, data, obj.status); break;
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