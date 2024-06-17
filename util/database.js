const mongoDb = require("mongodb");

const MongoClient = mongoDb.MongoClient;

const mongoClient = (callback) => {
  MongoClient.connect(
    "mongodb+srv://sudhakardayalan95:gA0iB6ZrpDKb8Fx1@cluster0.f4hul3h.mongodb.net/"
  )
    .then(client => {
        console.log('Connected to DB');
        callback(client);
    })
    .catch((e) => console.log(e.message));
};

module.exports = mongoClient;
