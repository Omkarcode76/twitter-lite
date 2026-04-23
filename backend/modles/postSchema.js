import { Schema, model } from "mongoose";

const postSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        
}],
    user: {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
},
    {timestamps : true}

)

export default model('Post', postSchema)