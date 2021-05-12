FROM node:15-alpine

# ENV PATH="/scripts:${PATH}"

COPY ./app/package.json /package.json
RUN yarn install
ENV PATH="/node_modules/.bin:$PATH"

COPY ./scripts /scripts
RUN chmod +x /scripts/*

RUN mkdir /app
COPY ./app /app
WORKDIR /app
RUN npm run build

RUN mkdir -p /var/build
RUN cp -r ./build/ /var/build


# CMD [ "entrypoint.sh" ]
