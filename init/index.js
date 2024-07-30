const mongoose = require("mongoose");
const initData = require("./data.js");
const Linting = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");  // Call initDb after successful connection
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDb = async () => {
    await Linting.deleteMany({});
    await Linting.insertMany(initData.data);
    console.log("data was initialized");
}

initDb();