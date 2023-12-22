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

ARG NEXT_PUBLIC_ENV='production'
ARG CHANGELOG_FILTER_PROPERTY_NAME='Type'
ARG CHANGELOG_FILTER_PROPERTY_VALUE='Public'
ARG CHANGELOG_SORT_PROPERTY_NAME='Date'
ARG DISCORD_LINK='https://discord.gg/3d2FdBG2My'
ARG TWITTER_LINK='https://twitter.com/getmochi_bot'
ARG GITBOOK_LINK='https://mochibot.gitbook.io/mochi-bot/introduction/about-mochi-bot'
ARG HOME_URL='https://mochi.gg'
ARG ADD_DISCORD_BOT_LINK='/'
ARG NEXT_PUBLIC_BETA_PAGE="true"
ARG INVITE_LINK='https://discord.com/api/oauth2/authorize?client_id=1062540132269432863&permissions=8&scope=bot%20applications.commands'
ARG NEXT_PUBLIC_WALLET_LOGIN_SIGN_MESSAGE='This will help us connect your discord account to the wallet address.\n\nMochiBotCode=%s'
ARG NEXT_PUBLIC_MOCHI_PROFILE_API_HOST=''
ARG NEXT_PUBLIC_MOCHI_API_HOST=''
ARG NEXT_PUBLIC_MOCHI_PAY_API_HOST=''
ARG NEXT_PUBLIC_AUTH_TELEGRAM_ID=''
ARG NEXT_PUBLIC_AUTH_TELEGRAM_USERNAME=''

ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV
ENV CHANGELOG_FILTER_PROPERTY_NAME=$CHANGELOG_FILTER_PROPERTY_NAME
ENV CHANGELOG_FILTER_PROPERTY_VALUE=$CHANGELOG_FILTER_PROPERTY_VALUE
ENV CHANGELOG_SORT_PROPERTY_NAME=$CHANGELOG_SORT_PROPERTY_NAME
ENV DISCORD_LINK=$DISCORD_LINK
ENV TWITTER_LINK=$TWITTER_LINK
ENV GITBOOK_LINK=$GITBOOK_LINK
ENV HOME_URL=$HOME_URL
ENV ADD_DISCORD_BOT_LINK=$ADD_DISCORD_BOT_LINK
ENV NEXT_PUBLIC_BETA_PAGE=$NEXT_PUBLIC_BETA_PAGE
ENV INVITE_LINK=$INVITE_LINK
ENV NEXT_PUBLIC_MOCHI_PROFILE_API_HOST=$NEXT_PUBLIC_MOCHI_PROFILE_API_HOST
ENV NEXT_PUBLIC_MOCHI_API_HOST=$NEXT_PUBLIC_MOCHI_API_HOST
ENV NEXT_PUBLIC_MOCHI_PAY_API_HOST=$NEXT_PUBLIC_MOCHI_PAY_API_HOST
ENV NEXT_PUBLIC_WALLET_LOGIN_SIGN_MESSAGE=$NEXT_PUBLIC_WALLET_LOGIN_SIGN_MESSAGE
ENV NEXT_PUBLIC_AUTH_TELEGRAM_ID=$NEXT_PUBLIC_AUTH_TELEGRAM_ID
ENV NEXT_PUBLIC_AUTH_TELEGRAM_USERNAME=$NEXT_PUBLIC_AUTH_TELEGRAM_USERNAME

# Build the Next.js app
RUN pnpm build:mochi-web

WORKDIR /app/apps/mochi-web
    
# Expose the port that your app runs on
EXPOSE 3000

# Start the app
CMD [ "next", "start" ]