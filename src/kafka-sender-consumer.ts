import { Kafka } from 'kafkajs';

   const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092'],
   })
   const sendKafkaMessage = async (message) => {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: 'test-topic',
      messages: [
         message
      ],
    })
    await producer.disconnect();
   }
   const consumeMessages = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })
   }

   export const KafkaService = {
       sendKafkaMessage,
       consumeMessages
   }