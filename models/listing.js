const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: Object,
        default: "https://www.istockphoto.com/photo/coconut-tree-on-the-sky-background-gm1085074058-291155741",
        set: (v) => v === "" ? "https://www.istockphoto.com/photo/coconut-tree-on-the-sky-background-gm1085074058-291155741" : v,
    },
    price: {
        type: Number,
        default: 0, // or any default value you prefer
    },
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point' // Default value
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0] // Default coordinates (longitude, latitude)
        }
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews }});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
