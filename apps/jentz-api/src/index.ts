import serverlessExpress from "@codegenie/serverless-express";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Callback, Context, Handler } from "aws-lambda";
let server: Handler;
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
};
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
