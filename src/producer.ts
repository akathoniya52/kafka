import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  await producer.send({
    topic: "payment-don",
    messages: [{ value: "Hello KafkaJS User! from node js process" }],
  });
};

run().then(console.error);
