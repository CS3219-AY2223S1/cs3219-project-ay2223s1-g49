import mongoose from 'mongoose';
var Schema = mongoose.Schema
let CollabModelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('CollabModel', CollabModelSchema)
