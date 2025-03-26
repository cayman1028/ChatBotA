FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.js ./

RUN npm install

# 開発環境ではソースコードはボリュームマウントするため、COPYは不要
# COPY src/ ./src/

# ビルドは開発中は不要
# RUN npm run build

EXPOSE 3000

# 開発環境ではコンテナ起動時にシェルを提供
CMD ["sh"] 