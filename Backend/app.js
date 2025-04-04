const express = require("express")
const app =express();
const mongoose= require("mongoose");
const Listing = require("./model/listing.js");
const cors = require("cors");
require("dotenv").config();

app.use(cors());


const MONGO_URL=process.env.MONGO_URL;
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
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hi i m root")
})

// index route 
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.send(allListings);
})

// Show route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.send(listing);
})

// Create Route 

app.post("/listings",async(req,res)=>{
    let {title,description,faqs} = req.body;
    const newListing = new Listing({title,description,faqs});
    await newListing.save();
    res.redirect("/listings")

})

// Edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.send(listing);
})

// Update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let {title,description,faqs} = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(id,{title,description,faqs},{new:true});
    res.send(updatedListing);
}) 
// Delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.send(deletedListing);
})
app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})