FROM ubuntu:bionic

# === INSTALL BROWSER DEPENDENCIES ===
# Install gstreamer and plugins to support video playback in WebKit.
# Install WebKit dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libwoff1 \
    libopus0 \
    libwebp6 \
    libwebpdemux2 \
    libenchant1c2a \
    libgudev-1.0-0 \
    libsecret-1-0 \
    libhyphen0 \
    libgdk-pixbuf2.0-0 \
    libegl1 \
    libnotify4 \
    libxslt1.1 \
    libevent-2.1-6 \
    libgles2 \
    libvpx5 \
    libxcomposite1 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libepoxy0 \
    libgtk-3-0 \
    libharfbuzz-icu0

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

# Install Firefox dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libdbus-glib-1-2 \
    libxt6

# Install ffmpeg to bring in audio and video codecs necessary for playing videos in Firefox.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg

# (Optional) Install XVFB if there's a need to run browsers in headful mode
RUN apt-get update && apt-get install -y --no-install-recommends \
    xvfb
# === INSTALL Node.js ===

# Install node15
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_15.x | bash - && \
    apt-get install -y nodejs

# Feature-parity with node.js base images.
RUN apt-get update && apt-get install -y --no-install-recommends git ssh

# Create the pwuser (we internally create a symlink for the pwuser and the root user)
RUN adduser pwuser

# === BAKE BROWSERS INTO IMAGE ===
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

RUN mkdir /ms-playwright && chmod 777 /ms-playwright

WORKDIR /home/pwuser/
# Копируем файлы
RUN git clone https://github.com/knight-lightning/crtweb_demo.git
WORKDIR /home/pwuser/crtweb_demo/

RUN npm install -g npm@7.5.4
# Устанавливааем зависимости проекта
RUN npm install

# Запускаем тесты
RUN npm test