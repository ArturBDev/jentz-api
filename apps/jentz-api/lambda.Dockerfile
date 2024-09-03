FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY tsconfig.build.json .
COPY tsconfig.json .
COPY yarn.lock .
COPY package.json .
COPY nest-cli.json .
COPY apps/jentz-api apps/jentz-api

RUN yarn install
RUN npx prisma generate --schema apps/jentz-api/prisma/schema.prisma
RUN npx prisma migrate dev --schema=apps/jentz-api/prisma/schema.prisma
RUN yarn run build jentz-api

CMD [ "dist/apps/jentz-api/index.handler" ]