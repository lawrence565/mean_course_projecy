# 課程系統

這是一個使用 MERN 方案建置的簡單課程系統

### 系統功能

使用者可以透過系統註冊，並根據不同身份使用不同功能，如學生可以選課、老師可以製作課程等等。

# 系統使用教學

下載檔案包後需使用以下命令安裝套件並建立簡單的 Secret 供 passport 使用

```
# 安裝套件
cd client && npm i && cd ../server && npm i

# 建立 .env 製作簡易 Passport secret
echo "PASSPORT_SECRET="testsecret"" > .env
```
