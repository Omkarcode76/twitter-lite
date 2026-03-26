import { Schema, model } from "mongoose";

const postSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type : Schema.Types.ObjectId,
        ref : User,
        required : true
    },
},
    {timeStamps : true}

)

export default model('Post', postSchema)