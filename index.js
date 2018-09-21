let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port : 3000 });

exports.MongoClient = require('mongodb').MongoClient;
exports.url = 'mongodb://localhost:27017/';

console.log('Server running on port 3000');

let name = require('./name');
let level = require('./level');
let goods = require('./goods');
let item = require('./item');
let building = require('./building');
let interior = require('./interior');
let character = require('./character');
let party = require('./party');
let request = require('./request');
let storyStar = require('./storyStar');

wss.on('connection', (ws) => {
    console.log('Client connected.');
    ws.on('message', (message) => {
        let obj = JSON.parse(message);
        let data = JSON.parse(obj.data);

        let code = obj.status.substring(0, 4);

        switch(code) {
            case '0110': name.onMessageFindName(ws, data, obj.status); break;
            case '0120': name.onMessageInsertName(ws, data, obj.status); break;
            case '0130': name.onMessageDeleteName(ws, data, obj.status); break;
            case '0140': name.onMessageUpdateName(ws, data, obj.status); break;

            case '0210': level.onMessageFindLevel(ws, data, obj.status); break;
            case '0220': level.onMessageInsertLevel(ws, data, obj.status); break;
            case '0230': level.onMessageDeleteLevel(ws, data, obj.status); break;
            case '0240': level.onMessageUpdateLevel(ws, data, obj.status); break;

            case '0310': goods.onMessageFindGoods(ws, data, obj.status); break;
            case '0320': goods.onMessageInsertGoods(ws, data, obj.status); break;
            case '0330': goods.onMessageDeleteGoods(ws, data, obj.status); break;
            case '0340': goods.onMessageUpdateGoods(ws, data, obj.status); break;

            case '0410': item.onMessageFindItems(ws, data, obj.status); break;
            case '0420': item.onMessageInsertItem(ws, data, obj.status); break;
            case '0430': item.onMessageDeleteItem(ws, data, obj.status); break;
            case '0431': item.onMessageDeleteItems(ws, data, obj.status); break;
            case '0440': item.onMessageUpdateItem(ws, data, obj.status); break;

            case '0510': building.onMessageFindBuildings(ws, data, obj.status); break;
            case '0520': building.onMessageInsertBuilding(ws, data, obj.status); break;
            case '0530': building.onMessageDeleteBuilding(ws, data, obj.status); break;
            case '0531': building.onMessageDeleteBuildings(ws, data, obj.status); break;
            case '0540': building.onMessageUpdateBuilding(ws, data, obj.status); break;

            case '0610': interior.onMessageFindInteriors(ws, data, obj.status); break;
            case '0620': interior.onMessageInsertInterior(ws, data, obj.status); break;
            case '0630': interior.onMessageDeleteInterior(ws, data, obj.status); break;
            case '0631': interior.onMessageDeleteInteriors(ws, data, obj.status); break;
            case '0640': interior.onMessageUpdateInterior(ws, data, obj.status); break;

            case '0710': character.onMessageFindCharacters(ws, data, obj.status); break;
            case '0720': character.onMessageInsertCharacter(ws, data, obj.status); break;
            case '0730': character.onMessageDeleteCharacter(ws, data, obj.status); break;
            case '0731': character.onMessageDeleteCharacters(ws, data, obj.status); break;
            case '0740': character.onMessageUpdateCharacter(ws, data, obj.status); break;

            case '0810': party.onMessageFindParties(ws, data, obj.status); break;
            case '0820': party.onMessageInsertParty(ws, data, obj.status); break;
            case '0830': party.onMessageDeleteParty(ws, data, obj.status); break;
            case '0831': party.onMessageDeleteParties(ws, data, obj.status); break;
            case '0840': party.onMessageUpdateParty(ws, data, obj.status); break;

            case '0910': request.onMessageFindRequests(ws, data, obj.status); break;
            case '0920': request.onMessageInsertRequest(ws, data, obj.status); break;
            case '0930': request.onMessageDeleteRequest(ws, data, obj.status); break;
            case '0931': request.onMessageDeleteRequests(ws, data, obj.status); break;

            case '1010': storyStar.onMessageFindStoryStars(ws, data, obj.status); break;
            case '1020': storyStar.onMessageInsertStoryStar(ws, data, obj.status); break;
            case '1030': storyStar.onMessageDeleteStoryStar(ws, data, obj.status); break;
            case '1031': storyStar.onMessageDeleteStoryStars(ws, data, obj.status); break;
            case '1040': storyStar.onMessageUpdateStoryStar(ws, data, obj.status); break;

            case '0000': onMessageDropCollection(ws, data, obj.status); break;
        }
    });
});

// DROP

// const onMessageDropCollection = (ws, data) => {
//     exports.MongoClient.connect(exports.url, { useNewUrlParser:true }, (err, db) => {
//         if(err) throw err;
//         let dbo = db.db('mydb');
//         dbo.collection(data).drop((err, ok) => {
//             if(err) throw err;
//             if(ok) console.log(data + ' dropped.');
//             db.close();
//         });
//     });
// }

// exports.MongoClient.connect(exports.url, { useNewUrlParser:true }, (err, db) => {
//     if(err) throw err;
//     let dbo = db.db('mydb');
//     dbo.collection('Item').drop((err, ok) => {
//         if(err) throw err;
//         console.log('dropped.');
//         db.close();
//     });
// });