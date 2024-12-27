FROM node
WORKDIR /home/node/app
COPY ./books.json .
RUN npm i -g json-server
ENTRYPOINT [ "json-server" ,"books.json", "-h", "0.0.0.0" ]