FROM node:18

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build || echo "skip build if not needed"

EXPOSE 3000

CMD ["node", "server.js"]
