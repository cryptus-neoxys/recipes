const fs = require("fs");
var MongoClient = require("mongodb").MongoClient;
var url = process.env.MONGODB_URI;

let ingredients = new Set();

MongoClient.connect(url, async function (err, db) {
  if (err) throw err;

  var dbo = db.db("test");

  let rawdata = fs.readFileSync("/home/cryptus/Downloads/train.json");
  let data = JSON.parse(rawdata);

  console.log(dbo);

  for (var x = 0; x < 10; x += 1) {
    if (data[x].ingredients.length)
      for (var y = 0; y < data[x]?.ingredients.length; x += 1) {
        ingredients.add({ name: data[x]?.ingredients[y].toLowerCase() });
      }
  }
  console.log(ingredients);
  try {
    await dbo.collection("ingredients").insertMany(Array.from(ingredients));
  } catch (error) {
    console.log("hagg diya");
  }
});

// console.log(data.slice(0, 10));
