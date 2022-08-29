# Karani Aggregator
Karani aggregator is responsible for aggregating signtures from the nodes , and sending the result back to the nodes. The nodes then decided indendently to add the block to the blockchain based on the percent of valid signatures.
The block is committed when atleast 70% valid node/peer signatures are contained in the block proposal.

## Installation
Requires NodeJS and Kafka server installed
```
npm run install
npm run dev

```
Create kafka.yml with the following config, edit where necessary
```
version: "3"
services:
  zookeeper:
    image: wurstmeister/zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"

  kafka:
    image: wurstmeister/kafka
    container_name: kafka
    ports:
      - "9092:9092"

    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
```

```
docker-compose -f kafka.yml up -d
````
