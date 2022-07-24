const mongoose = require ('mongoose');

const categorieSchema = new mongoose.Schema ({

    name_cat: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        default:null
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
categorieSchema.pre('updateOne', function() {
    this.update({updated_at:Math.floor(Date.now()).toString()})
});
categorieSchema.pre('updateMany', function() {
    this.update({updated_at:Math.floor(Date.now()).toString()})
});
module.exports = mongoose.model('categories', categorieSchema);
