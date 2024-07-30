// const mongoose = require("mongoose");

// const listingSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     image: {
//         filename: String,  // Add filename
//         url: String        // URL for the image
//     },
//     price: Number,
//     location: String,
//     country: String
// });

// module.exports = mongoose.model("Listing", listingSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
