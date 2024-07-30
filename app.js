const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // Use a single correct import
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hi I am HOME Page");
});

// New listing form
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});

// Handle form submission for creating new listing
app.post("/listings", async (req, res) => {
    const { title, image, description, price, location, country } = req.body;
    const newListing = new Listing({
        title,
        description,
        image: {
            filename: 'listingimage', // You can dynamically generate this if needed
            url: image // Use the URL provided in the form
        },
        price,
        location,
        country
    });
    await newListing.save();
    res.redirect("/listings");
});

// Show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
});

// Edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
});

// Update route
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const { title, image, description, price, location, country } = req.body;
    await Listing.findByIdAndUpdate(id, {
        title,
        description,
        image: {
            filename: 'listingimage', // You can dynamically generate this if needed
            url: image // Use the URL provided in the form
        },
        price,
        location,
        country
    });
    res.redirect(`/listings/${id}`);
});

// Delete route
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
