FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# グローバルパッケージのインストール
RUN npm install -g npm@latest vite typescript ts-node

# 作業ディレクトリを設定
WORKDIR /workspace

# Gitの設定
RUN git config --global pull.rebase true && \
    git config --global core.autocrlf input

# 必要に応じて追加のシステムパッケージをインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    curl \
    wget \
    gnupg \
    ca-certificates \
    && apt-get autoremove -y && apt-get clean -y

