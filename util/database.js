const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) =>{
    MongoClient.connect('mongodb+srv://RaunakSharma:PozqDxDkbYn0rcLm@cluster0.zmhsk06.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
        console.log('database connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log('database connnection: ',err);
        throw err;
    });
};

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No DataBase Found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;