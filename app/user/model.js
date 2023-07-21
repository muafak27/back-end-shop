const mongoose = require('mongoose')
const { Schema, model } = mongoose
const AutoIncrement = require('mongoose-auto-increment')
const bcrypt = require('bcrypt')

AutoIncrement.initialize(mongoose.connection);
let userSchema = Schema({
    full_name: {
        type: String,
        required: [true, 'nama harus diisi'],
        maxlength: [255, 'panjang nama harus antara 3 - 255 karakter'],
        minlength: [3, ' panjang nama harus antara 3 - 255 karakter']
    },

    customer_id : {
        type: Number, 
    },

    email: {
        type: String,
        required: [true, 'email harus diisi'],
        maxlength: [255, 'panjang email maksimal 255 karakter']
    },

    password: {
        type: String,
        required: [true, 'password harus diisi'],
        maxlength: [255, 'panjang password maksimal 255 karakter']
    },
    
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    token: [String]
}, {timestamp: true});

userSchema.path('email').validate(function(value){
    const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return EMAIL_RE.test(value)
}, attr => `${attr.value} harus merupakan email yang valid!`);

userSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('User').count({email: value})
        console.log(count)
        console.log(email=value)
        return !count
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`);

const HASH_ROUND = 10
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
});


userSchema.plugin(AutoIncrement.plugin, { 
    model: 'User',
    field: 'customer_id',
    startAt: 1,
    incrementBy: 1
 });

module.exports = model('User', userSchema)