import express from "express";
import {
  addAlchemyContextToRequest,
  validateAlchemySignature,
  AlchemyWebhookEvent,
} from "./alchemy";

export function startListener(signingKey: string) {
  const app = express();

  const LOCAL_PORT = process.env.LOCAL_PORT ? process.env.LOCAL_PORT : "8080";
  const LOCAL_HOST = process.env.LOCAL_HOST
    ? process.env.LOCAL_HOST
    : "127.0.0.1";
  const WEBHOOK_CONTEXT = process.env.WEBHOOK_CONTEXT
    ? process.env.WEBHOOK_CONTEXT
    : "";

  // Middleware needed to validate the alchemy signature
  app.use(
    express.json({
      verify: addAlchemyContextToRequest,
    })
  );
  app.use(validateAlchemySignature(signingKey));

  // Register handler for Alchemy Notify webhook events
  app.post(`/${WEBHOOK_CONTEXT}`, (req, res) => {
    const webhookEvent = req.body as AlchemyWebhookEvent;
    // Do stuff with with webhook event here!
    console.log(`Processing webhook event id: ${webhookEvent.id}`);
    // Be sure to respond with 200 when you successfully process the event
    res.send("Alchemy Notify is the best!");
  });

  // Listen to Alchemy Notify webhook events
  app.listen(Number(LOCAL_PORT), LOCAL_HOST, () => {
    console.log(
      `Example Alchemy Notify app listening at ${LOCAL_HOST}:${LOCAL_PORT}`
    );
  });
}
