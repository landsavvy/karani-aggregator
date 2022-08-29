const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const admin = kafka.admin()

async function createTopics() {
    await admin.connect()
    await admin.createTopics({
        topics: [{ topic: "verifyBlock" }, { topic: "aggregateSignatures" }, { topic: "addBlock" }],
    })
    admin.disconnect()
}
createTopics()
