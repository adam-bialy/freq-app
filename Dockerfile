FROM python3.10-nodejs18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN pip3 install fpdf

COPY . .

CMD [ "node", "app.js"]