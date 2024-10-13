import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "my-app" + Math.random() });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "payment-don", fromBeginning: true });

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

run().then(console.error);
