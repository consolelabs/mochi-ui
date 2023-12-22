# Choose the Node.js LTS version as the base image
FROM node:18-alpine3.18

# Install python
RUN apk add --no-cache python3 py3-pip

# Install the dependencies
RUN npm install -g pnpm
# RUN npm install -g pnpm turbo-cli next typescript ts-node

# Set the working directory
WORKDIR /app

# Copy the rest of your app's source code
COPY . .
# Copy package.json and package-lock.json, and pnpm-lock.yaml
# COPY package*.json ./
# COPY pnpm-lock.yaml ./
# # Install the dependencies apps/mochi-web
# COPY apps/mochi-web/package*.json ./apps/mochi-web/package*.json

RUN pnpm install

ARG NEXT_PUBLIC_MOCHI_PROFILE_API_HOST=NEXT_PUBLIC_MOCHI_PROFILE_API_HOST
ARG NEXT_PUBLIC_MOCHI_PAY_API_HOST=NEXT_PUBLIC_MOCHI_PAY_API_HOST
ARG NEXT_PUBLIC_MOCHI_API_HOST=NEXT_PUBLIC_MOCHI_API_HOST
ARG ADD_DISCORD_BOT_LINK=https://discord.com/api/oauth2/authorize?client_id=1062540132269432863&permissions=8&scope=bot%20applications.commands

ENV NEXT_PUBLIC_MOCHI_PROFILE_API_HOST=$NEXT_PUBLIC_MOCHI_PROFILE_API_HOST
ENV NEXT_PUBLIC_MOCHI_PAY_API_HOST=$NEXT_PUBLIC_MOCHI_PAY_API_HOST
ENV NEXT_PUBLIC_MOCHI_API_HOST=$NEXT_PUBLIC_MOCHI_API_HOST
ENV ADD_DISCORD_BOT_LINK=$ADD_DISCORD_BOT_LINK


# Build the Next.js app
RUN pnpm build:mochi-web

WORKDIR /app/apps/mochi-web
    
# Expose the port that your app runs on
EXPOSE 3000

# Start the app
CMD [ "next", "start" ]