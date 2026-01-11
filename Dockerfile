FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN apk add --no-cache \
    bash \
    python3 \
    py3-pip \
    curl \
    groff \
    less \
    aws-cli \
    && chmod +x /app/fetch_env.sh

EXPOSE 3000
CMD ["/app/fetch_env.sh"]