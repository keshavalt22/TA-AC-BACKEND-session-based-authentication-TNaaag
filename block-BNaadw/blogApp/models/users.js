let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

var userSchema = new Schema({
    profile: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    email: {type: String, required: true, unique: true},
    password: {type: String, minlength: 5, required: true},
    city: String
 }, {timestamps: true});


userSchema.pre('save', function(next) {
    if(this.password && this.isModified('password')) {
        bcrypt.hash(this.password, 12, (err, hashed) => {
            if(err) return next(err);
            this.password = hashed;
            return next();
        })
    } else{ next() }
});

userSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        return cb(err, result);
    })
};


module.exports = mongoose.model('User', userSchema);