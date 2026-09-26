# استخدام صورة Node.js الرسمية
FROM node:20-slim

# تثبيت متطلبات Playwright و Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
    wget \
    && rm -rf /var/lib/apt/lists/*

# تعيين متغيرات البيئة لـ Playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium

# إنشاء مجلد التطبيق
WORKDIR /app

# نسخ ملفات الحزمة وتثبيت التبعيات
COPY package*.json ./
RUN npm install

# نسخ باقي الملفات
COPY . .

# المنفذ الذي سيستمع عليه التطبيق
EXPOSE 3000

# أمر التشغيل
CMD ["node", "server.js"]