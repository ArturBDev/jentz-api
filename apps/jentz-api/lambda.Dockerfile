FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

ENV DATABASE_URL "postgres://default:gRhE6lmO8IGy@ep-long-sky-a50e8loo.us-east-2.aws.neon.tech:5432/verceldb?sslmode=require"

COPY tsconfig.build.json .
COPY tsconfig.json .
COPY package-lock.json .
COPY package.json .
COPY nest-cli.json .
COPY apps/jentz-api apps/jentz-api

RUN npm i
RUN npx prisma generate --schema apps/jentz-api/prisma/schema.prisma
RUN npx prisma migrate dev --schema=apps/jentz-api/prisma/schema.prisma
RUN npm run build jentz-api

CMD [ "dist/apps/jentz-api/index.handler" ]