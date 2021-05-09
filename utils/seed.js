const fs = require("fs");
var MongoClient = require("mongodb").MongoClient;
var url = process.env.MONGODB_URI;

let toTitleCase = (s) => {
  try {
    if (typeof s !== "string") throw new Error("Must be string");
    else {
      return s
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }
  } catch (error) {
    console.error(error);
  }
};

let ingredients = new Set();

MongoClient.connect(url, async function (err, db) {
  if (err) throw err;
  var dbo = db.db("test");

  let rawdata = fs.readFileSync("C:\\Dev\\train.json");
  let data = JSON.parse(rawdata);

  for (var x = 0; x < data.length; x += 1) {
    if (data[x].ingredients.length)
      for (var y = 0; y < data[x]?.ingredients.length; x += 1) {
        ingredients.add(toTitleCase(data[x]?.ingredients[y]));
      }
  }
  try {
    ingredients = Array.from(ingredients);

    ingredients = ingredients.map((item) => {
      return { name: item };
    });

    console.trace(ingredients);

    await dbo.collection("ingredients").insertMany(ingredients);
  } catch (error) {
    console.log(error, "hagg diya");
  }
});

// console.log(data.slice(0, 10));
