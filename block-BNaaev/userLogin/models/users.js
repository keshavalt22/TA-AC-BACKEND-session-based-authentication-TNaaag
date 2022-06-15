let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

var userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, minlength: 5, required: true},
    age: {type: Number, required: true},
    phone: {type: Number, required: true}
 }, {timestamps: true});


userSchema.pre('save', function(next) {
    if(this.password && this.isModified('password')) {
        bcrypt.hash(this.password, 12, (err, hashed) => {
            if(err) return next(err);
            this.password = hashed;
            return next();
        })
    } else{ next() }
})


module.exports = mongoose.model('User', userSchema);