FROM node:23-alpine
WORKDIR /app
COPY package.json ./
RUN npm i -y 
USER node
COPY --chown=node:node --chmod=755 . .
EXPOSE 3000
ENTRYPOINT [ "npm","start" ]