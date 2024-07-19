# ---- Base Node ----
    FROM node:22-bullseye  AS base
    COPY package*.json package-lock.json ./
    
    # ---- Dependencies ----
    FROM base AS dependencies
    RUN npm install
    
    # ---- Copy Files/Build ----
    FROM dependencies AS build
    COPY . .
    RUN npx prisma generate
    RUN npm run build
    
    # Expose the port on which the app will run
    EXPOSE 3001
    
    # Start the server using the production build
    CMD ["node", "dist/src/main.js"]