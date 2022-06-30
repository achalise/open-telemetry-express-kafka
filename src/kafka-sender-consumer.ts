import { Kafka } from 'kafkajs';

   const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092'],
   })
   const sendKafkaMessage = async (message, topic?) => {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: topic || 'test-topic',
      messages: [
         message
      ],
    })
    await producer.disconnect();
   }
   const consumeMessages = async (topic, processorFn, consumerGroup?) => {
    topic = topic || 'test-topic';
    const consumer = kafka.consumer({ groupId: `test-group-${consumerGroup || topic}` });
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        processorFn();
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