import {initOtelTracer} from './tracer';
initOtelTracer('email-service');

import api from '@opentelemetry/api';
import { KafkaService } from './kafka-sender-consumer';


const startUp = async () => {
  await KafkaService.consumeMessages('send-email', (msg) => {
    console.log(`Processed message ${JSON.stringify(msg)}`);
    const message = {value: JSON.stringify({
      status: 'Actication Success'
    })};
    //KafkaService.sendKafkaMessage({value: JSON.stringify({subject: `test email subject`, to: `test recipient`})}, 'activation-completed');
    KafkaService.sendKafkaMessage(message, 'activation-completed');
  });
}

startUp();


