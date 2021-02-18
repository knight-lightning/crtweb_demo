FROM ubuntu:bionic

# === INSTALL BROWSER DEPENDENCIES ===

# Install gstreamer and plugins to support video playback in WebKit.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgstreamer-gl1.0-0 \
    libgstreamer-plugins-bad1.0-0 \
    gstreamer1.0-plugins-good \
    gstreamer1.0-libav

# Install Chromium dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    fonts-liberation \
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-noto-color-emoji \
    libxtst6

# (Optional) Install XVFB if there's a need to run browsers in headful mode
RUN apt-get update && apt-get install -y --no-install-recommends \
    xvfb

# === INSTALL Node.js ===

# Install node15
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_15.x | bash - && \
    apt-get install -y nodejs

# Feature-parity with node.js base images.
RUN apt-get update && apt-get install -y --no-install-recommends git ssh && \
    npm install -g yarn

# Create the pwuser (we internally create a symlink for the pwuser and the root user)
RUN adduser pwuser

# === BAKE BROWSERS INTO IMAGE ===
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

RUN mkdir /ms-playwright && chmod 777 /ms-playwright

# 1. Add tip-of-tree Playwright package to install its browsers.
#    The package should be built beforehand from tip-of-tree Playwright.
COPY ./playwright.tar.gz /tmp/playwright.tar.gz

# 2. Install playwright and then delete the installation.
#    Browsers will remain downloaded in `/ms-playwright`.
RUN su pwuser -c "mkdir /tmp/pw && cd /tmp/pw && npm init -y && \
    npm i /tmp/playwright.tar.gz" && \
    rm -rf /tmp/pw && rm /tmp/playwright.tar.gz

# Копируем файлы
COPY . /home/crtwebTest
WORKDIR /home/crtwebTest

# Устанавливааем зависимости проекта
RUN npm install

# Запускаем тесты
RUN npm test