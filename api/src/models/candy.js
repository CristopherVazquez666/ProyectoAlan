const mongoose = require ('mongoose');

const candySchema = new mongoose.Schema ({

    name_prod: {
        type: String,
        required: true
    },

    categorie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    created_at: {
        type: String,
        default: Math.floor(Date.now())
    },

    updated_at: {
        type: String,
        default: Math.floor(Date.now())
    }

});
candySchema.pre('updateOne', function() {
    this.update({updated_at:Math.floor(Date.now()).toString()})
});
candySchema.pre('updateMany', function() {
    this.update({updated_at:Math.floor(Date.now()).toString()})
});
module.exports = mongoose.model('candies', candySchema);
