let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    likes: {type: Number, default: 0},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    author: String
}, {timestamps: true});

module.exports = mongoose.model('Article', articleSchema);