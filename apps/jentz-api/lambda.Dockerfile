FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY tsconfig.json .
COPY tsconfig.build.json .
COPY package-lock.json .
COPY package.json .
COPY nest-cli.json .
COPY apps/jentz-api apps/jentz-api

RUN npm i
RUN npx prisma generate
RUN npm run build jentz-api

CMD [ "dist/index.handler" ]