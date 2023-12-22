# Choose the Node.js LTS version as the base image
FROM node:18-alpine

# Install python
RUN apk add --no-cache python3 py3-pip 

# Install the dependencies
RUN npm install -g pnpm turbo-cli next

# Set the working directory
WORKDIR /app

# Copy the rest of your app's source code
COPY . .
# Copy package.json and package-lock.json, and pnpm-lock.yaml
# COPY package*.json ./
# COPY pnpm-lock.yaml ./
# # Install the dependencies apps/mochi-web
# COPY apps/mochi-web/package*.json ./apps/mochi-web/package*.json

RUN pnpm install -P

# Copy the rest of your app's source code
COPY . .

# Build the Next.js app
RUN pnpm build:mochi-web

WORKDIR /app/apps/mochi-web
    
# Expose the port that your app runs on
EXPOSE 3000

# Start the app
CMD [ "next", "start" ]