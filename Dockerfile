FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update || : && apt-get install python3 -y

RUN apt-get install python3-pip -y

RUN python3 -m pip install fpdf

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
