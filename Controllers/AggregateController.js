const Block = require("../Models/Block")


exports.add = async (newBlock) => {

    console.log("aggregator received", newBlock.blockNum)
    //check block if exists
    var mixedId = "num" + newBlock.blockNum + "time" + newBlock.txTime
    var block = await Block.findOne({ mixedId: mixedId })
    //check block time for both   
    if (block) {
        //append new signature
        block.peerSignatures.push(newBlock.peerSign)
        await block.save()
    } else {
        //create new block
        block = await Block.create({
            blockNum: newBlock.blockNum,
            transactionType: newBlock.transactionType,
            txTime: newBlock.txTime,
            data: newBlock.data,
            mixedId: mixedId,
            gokSign: newBlock.gokSign,
            peerSignatures: [newBlock.peerSign]
        })
    }
    //remove signatures db ids
    //convert to POJO
    block = block.toObject()

    delete newBlock.peerSign
    var peerSignatures = block.peerSignatures.map(s => {
        return { peerSignature: s.peerSignature, peerId: s.peerId }
    })

    newBlock.peerSignatures = peerSignatures
    console.log("aggregator approved", newBlock.blockNum)
    //count signature 70% signatures
    if (newBlock.peerSignatures.length == 2) {
        console.log("aggregator send block", newBlock.blockNum)
        await producer.send({
            topic: 'addBlock',
            messages: [{ value: JSON.stringify(newBlock) }],
        })
        newBlock.confirmStatus = true
        await producer.send({
            topic: 'confirmStatus',
            messages: [{ value: JSON.stringify(newBlock) }],
        })
    }
    //add to db





}