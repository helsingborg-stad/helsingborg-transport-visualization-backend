FROM node:16

RUN apt-get update && apt-get install --yes bash build-essential

WORKDIR /app
ADD . /app

RUN npm ci --omit=dev
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
