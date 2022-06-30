import {initOtelTracer} from './tracer';
initOtelTracer('user-service');

import * as express from 'express';
import api from '@opentelemetry/api';
import axios from 'axios';
import { KafkaService } from './kafka-sender-consumer';
import bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

KafkaService.consumeMessages('activation-completed', (msg) => {
  console.log(`Processed message ${JSON.stringify(msg)}`);
});

app.get('/user/:userid', async (req, resp) => {
  const currentSpan = api.trace.getSpan(api.context.active());
  // display traceid in the terminal
  console.log(`traceid: ${currentSpan.spanContext().traceId}`);

  //   const span = api.trace.getTracer('user-service').startSpan('handleRequest', {
//     kind: 1, // server
//     attributes: { key: 'value' },
//   });

  // Annotate our span to capture metadata about the operation
  //span.addEvent('invoking handleRequest');
  //invoke retrieve device
  const res = await axios.get(`http://localhost:5001/devices/user`);
  console.log(`Retrieved devices ${JSON.stringify(res.data)}`);
  //span.end();
    resp.status(200).json({userId: 'test'});
});

app.post(`/activate/:deviceid`, async (req, res) => {
  const device = req.body;
  console.log(`request body ${device}`);
  KafkaService.sendKafkaMessage({value: JSON.stringify(device)});
  res.status(200).json({status: 'SUCCESS'});
});

app.listen(port);
console.log(`UserService listening on port `);
