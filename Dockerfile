FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all source code
COPY . .

EXPOSE 3004
ENV NODE_ENV=production

CMD ["node", "src/server.js"]
