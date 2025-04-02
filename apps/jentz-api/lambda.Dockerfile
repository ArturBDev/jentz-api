FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

# Configurações do OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV OPENSSL_CONF=/etc/ssl/

COPY tsconfig.build.json .
COPY tsconfig.json .
COPY yarn.lock .
COPY package.json .
COPY nest-cli.json .
COPY apps/jentz-api apps/jentz-api

# Instalação das dependências com configurações adicionais
RUN npm install -g yarn && \
    yarn config set network-timeout 300000 && \
    yarn install --network-timeout 300000 && \
    yarn cache clean

RUN npx prisma generate --schema apps/jentz-api/prisma/schema.prisma
RUN npx prisma migrate dev --schema=apps/jentz-api/prisma/schema.prisma
RUN yarn run build jentz-api

CMD [ "dist/apps/jentz-api/index.handler" ]