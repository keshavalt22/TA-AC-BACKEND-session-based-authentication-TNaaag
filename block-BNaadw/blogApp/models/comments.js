let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    content: {type: String, required: true},
    articleId:{type: Schema.Types.ObjectId, ref: "Article", required: true},
}, {timestamps: true})

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;