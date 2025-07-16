const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

// postSchema.virtual('author', {

//     foreignKeyField: 'author',
//     localField: "_id"
// })

const Posts = mongoose.model('Posts', postSchema)


module.exports = { Posts }