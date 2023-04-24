# 基於node的官方映像檔作為基礎
FROM node:14-alpine

# 設置工作目錄為React應用程式的根目錄
WORKDIR /app

# 將React應用程式的所有檔案複製到容器的工作目錄中
COPY . .

# 安裝所需的依賴項
RUN npm install

# 執行React應用程式
CMD ["npm", "start"]
