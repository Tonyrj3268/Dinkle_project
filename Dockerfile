# 使用 Node.js 映像作為基礎
FROM node:14-alpine

# 將工作目錄設定為應用程式代碼的根目錄
WORKDIR /Dinkle-Demo

# 複製 package.json 和 package-lock.json 到容器中
COPY package*.json ./

# 安裝相依套件
RUN npm install

# 將應用程式代碼複製到容器中
COPY . .

# 執行編譯指令
RUN npm run build

# 使用 nginx 映像作為基礎，將 React 編譯出來的檔案複製到 nginx 中
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# 開啟 80 號埠
EXPOSE 80

# 執行 nginx
CMD ["nginx", "-g", "daemon off;"]