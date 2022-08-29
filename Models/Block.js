const mongoose = require("mongoose")
const { Schema } = mongoose

const BlockSchema = new Schema(
    {
        blockNum: Number,
        txType: String,
        mixedId: String,
        txTime: Number,
        data: String,
        gokSign: String,
        peerSignatures: [{ peerId: String, peerSignature: String }]
    },
    {
        timestamps: true
    })
var Block = mongoose.model("block", BlockSchema)

module.exports = Block
