const mongoose = require("mongoose");
const initData  = require("./data.js");
const Listing = require("../model/listing.js");


const MONGO_URL="mongodb://localhost:27017/axethetax";

main()
    .then(()=>{
        console.log("Connected to the DB")
    })
    .catch((err)=>{
        console.log(err)
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("DB initialized")
}
initDB();