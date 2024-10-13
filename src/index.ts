import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "my-app" });

const run = async () => {
  await producer.connect();

  await producer.send({
    topic: "quickstart-events",
    messages: [{ value: "Hello KafkaJS User! from node js process" }],
  });

  await consumer.connect();
  await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offsets: message?.offset,
        value: message?.value?.toString(),
      });
    },
  });
};

// break down this login into consumer and producer

run().then(console.error);
