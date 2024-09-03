# ---- Base Node ----
    FROM node:22-bullseye  AS base
    COPY package*.json package-lock.json ./
    
    # ---- Dependencies ----
    FROM base AS dependencies
    RUN yarn install
    
    # ---- Copy Files/Build ----
    FROM dependencies AS build
    COPY . .
    RUN chmod +x ./node_modules/.bin/nest
    RUN npx prisma generate --schema apps/jentz-api/prisma/schema.prisma
    RUN yarn run build
    
    # Expose the port on which the app will run
    EXPOSE 3001
    
    # Start the server using the production build
    CMD ["node", "dist/jentz-api/src/main.js"]