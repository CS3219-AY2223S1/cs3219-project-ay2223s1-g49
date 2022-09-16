import mongoose from 'mongoose';
var Schema = mongoose.Schema
let TokenModelSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
    }
})

export default mongoose.model('TokenModel', TokenModelSchema)