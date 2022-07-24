const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

const CustomerSchema = new mongoose.Schema ({

    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    logged: {
        type: Boolean,
        default: false
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
CustomerSchema.pre('updateOne', function() {
    this.update({updated_at:Math.floor(Date.now()).toString()})
});
CustomerSchema.pre('updateMany', function() {
    this.update({updated_at:Math.floor(Date.now()).toString()})
});

CustomerSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

CustomerSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password)
    return compare
}
module.exports = mongoose.model('customer', CustomerSchema);
