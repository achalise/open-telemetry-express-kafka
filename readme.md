### Open Telemetry with NodeJS

Example showing how to use opentelemetry with node applications.

Use NestJS to quickly create a couple of microservices. We will use OpenTelemtry to export data to visulalise 
how request flows through the microservices. 

- UserService
- DeviceService
- 

Open Telemetry Set up

`npm install --save @opentelemetry/api`
`npm install --save @opentelemetry/sdk-node`
`npm install --save @opentelemetry/auto-instrumentations-node`
`npm install --save @opentelemetry/exporter-trace-otlp-proto`


npm install @opentelemetry/api  @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-collector @opentelemetry/exporter-jaeger @opentelemetry/plugin-express @opentelemetry/plugin-http @opentelemetry/propagator-ot-trace @opentelemetry/resources @opentelemetry/sdk-node @opentelemetry/sdk-trace-base @opentelemetry/sdk-trace-node @opentelemetry/semantic-conventions @opentelemetry/tracing --save

run jaeger

```docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 14250:14250 \
  -p 9411:9411 \
  jaegertracing/all-in-one:latest```