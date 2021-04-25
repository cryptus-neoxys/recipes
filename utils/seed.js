var MongoClient = require("mongodb").MongoClient;
var url = process.env.MONGODB_URI;

let ingredients = [];

MongoClient.connect(url, function (err, db) {
  if (err) throw err;

  var dbo = db.db("test");

  let rawdata = fs.readFileSync(
    "/home/dikwickley/Downloads/archive/train.json"
  );
  let data = JSON.parse(rawdata);

  console.log(dbo);

  for (var x = 0; x < 10; x += 1) {
    ingredients = [...ingredients, ...data[x]?.ingredients];
  }
  console.log(ingredients);
});

const fs = require("fs");

// console.log(data.slice(0, 10));
