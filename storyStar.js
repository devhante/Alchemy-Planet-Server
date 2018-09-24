let index = require('./index');
let myQuery = require('./myQuery');

exports.onMessageFindStoryStars = (ws, data, status) => {
    findStoryStars(data.playerId, (res) => {
        console.log('findStoryStars: ' + res);
        let dataObj = [];
        let sendObj;
        if(res == null) {
            sendObj = { status: status, data: null };
        } else {
            for(let i = 0; i < res.length; i++) {
                dataObj[i] = { playerId: res[i].playerId, stageNumber: res[i].stageNumber, number: res[i].number };
            }
            sendObj = { status: status, data: JSON.stringify(dataObj) };
        }
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertStoryStar = (ws, data, status) => {
    insertStoryStar(data.playerId, data.stageNumber, data.number, (res) => {
        console.log('insertStoryStar: ' + res);
        let sendObj = { status: status, data: ""};
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageDeleteStoryStar = (ws, data, status) => {
    deleteStoryStar(data.playerId, data.stageNumber, (obj) => {
        console.log('deleteStoryStar: ' + obj);
    });
}

exports.onMessageDeleteStoryStars = (ws, data, status) => {
    deleteStoryStars(data.playerId, (obj) => {
        console.log('deleteStoryStars: ' + obj);
    });
}

exports.onMessageUpdateStoryStar = (ws, data, status) => {
    updateStoryStar(data.playerId, data.stageNumber, data.number, (res) => {
        console.log('updateStoryStar: ' + res);
    });
}

const findStoryStars = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('StoryStar', query, callback);
}

const insertStoryStar = (playerId, stageNumber, number, callback) => {
    let obj = { playerId: playerId, stageNumber: stageNumber, number: number };
    myQuery.insertOne('StoryStar', obj, callback);
}

const deleteStoryStar = (playerId, stageNumber, number, callback) => {
    let query = { playerId: playerId, stageNumber: stageNumber, number: number };
    myQuery.deleteOne('StoryStar', query, callback);
}

const deleteStoryStars = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('StoryStar', query, callback);
}

const updateStoryStar = (playerId, stageNumber, number, callback) => {
    let query = { playerId: playerId, stageNumber: stageNumber };
    let values = { $set: { number: number } };
    myQuery.updateOne('StoryStar', query, values, callback);
}

index.MongoClient.connect(index.url, { useNewUrlParser: true }, (err, db) => {
    if(err) throw err;
    let dbo = db.db('mydb');
    dbo.createCollection('StoryStar', (err, res) => {
        if(err) throw err;
        dbo.collection('StoryStar').createIndex( { playerId: 1, stageNumber: 1 }, { unique: true } );
        db.close();
    });
});