const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: { type: String,
         required: true, 
         trim: true },
    description: { 
        type: String,
         required: true },
    date: { type: Date,
         default: Date.now 
        },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ]
  });


  const Listing  = mongoose.model("Listing",listingSchema)
  module.exports = Listing
  