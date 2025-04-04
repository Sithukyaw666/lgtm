/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require('@opentelemetry/sdk-node');
const tempoURL = process.env.TEMPO_URL || 'http://tempo:4318/v1/traces';
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const {MongooseInstrumentation} = require('@opentelemetry/instrumentation-mongoose');
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: tempoURL,
  }),
  instrumentations: [getNodeAutoInstrumentations(),new MongooseInstrumentation()],
});

sdk.start();
