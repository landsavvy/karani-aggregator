require("dotenv").config()
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'aggregator',
    brokers: ['localhost:9092']
})
global.producer = kafka.producer()
//controlllers
const AggregateController = require("./Controllers/AggregateController")
const router = {
    blockAggregate: AggregateController.add
}
//db
const mongoose = require("mongoose")
var connectionString = "mongodb://*******:*******@localhost/aggregator?authSource=*******"

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
async function init() {
    const consumer = kafka.consumer({ groupId: 'aggregator' })
    await consumer.connect()
    await producer.connect()
    await consumer.subscribe({ topic: 'aggregateSignatures', fromBeginning: true })
    console.log("Started Aggregator Consumer")
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                //output block
                var block = JSON.parse(message.value)
                console.log("block", block)
                //pass block to router
                router.blockAggregate(block)
            } catch (ex) {
                console.error(ex)
            }


        },
    })

}
init()