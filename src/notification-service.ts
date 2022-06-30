import {initOtelTracer} from './tracer';
initOtelTracer('notification-service');

import api from '@opentelemetry/api';
import { KafkaService } from './kafka-sender-consumer';


const startUp = async () => {
  await KafkaService.consumeMessages('test-topic', (msg) => {
    console.log(`Processed message in notification service: ${JSON.stringify(msg)}`);
  }, 'notification-service');
}

startUp();


