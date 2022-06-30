import {initOtelTracer} from './tracer';
initOtelTracer('device-service');

import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from '@opentelemetry/api';
import { KafkaService } from './kafka-sender-consumer';

const port = process.env.PORT || 5001;
const app = express();
app.use(bodyParser.json());

const startUp = async () => {
  await KafkaService.consumeMessages('test-topic', async (msg) => {
    console.log(`processed message ${msg}`);
    KafkaService.sendKafkaMessage({value: JSON.stringify({subject: `test email subject`, to: `test recipient`})}, 'send-email');
  });
}

startUp();

app.get('/devices/:userid', (req, resp) => {
  req.rawHeaders.map(h => {
    console.log(`Header ${h} : ${req.headers[h]}`);
  });
  console.log(`The req headers ${req.headers}`);
  //const currentSpan = api.trace.getSpan(api.context.active());
  // display traceid in the terminal
  //console.log(`traceid: ${currentSpan.spanContext().traceId}`);
  // const span = api.trace.getTracer('device-service').startSpan('retrieveDevices', {
  //   kind: 1, // server
  //   attributes: { key: 'value' },
  // });
  // Annotate our span to capture metadata about the operation
//  span.addEvent('invoking retrieveDevices');
  //span.end();
    resp.status(200).json({devices: ['1', '2', '3']});
});

app.post(`/device/activate/:deviceid`, async (req, res) => {
  const device = req.body;
  console.log(`request body ${JSON.stringify(device)}`);
  await KafkaService.sendKafkaMessage({value: JSON.stringify(device)});
  res.status(200).json({status: 'SUCCESS'});
});

app.listen(port);
console.log(`DeviceService listening on port ${port}`);
