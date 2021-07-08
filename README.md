# Grocery E-Commerce Web Application - SE104.L23.PMCL

## Members

| Name                | Email                  |
| ------------------- | ---------------------- |
| Nguyễn Trường Thịnh | 18521447@gm.uit.edu.vn |
| Trần Hoàng Sơn      | 18521351@gm.uit.edu.vn |
| Đỗ Mạnh Quân        | 18521283@gm.uit.edu.vn |
| Nguyễn Chí Vỹ       | 18521681@gm.uit.edu.vn |
| Nguyễn Minh Quang   | 18521299@gm.uit.edu.vn |

## Manual

### Import data to MongoDB on Windows
1. Cài Mongodb community server
2. Cài Mongodb database tools
3. Gõ vào command: `mongorestore -d db_name /path/`
	- Với `db_name`: là tên bạn muốn đặt cho database (Ở đây tôi sẽ đặt là shopping)
	- Với `path`: là đường dẫn đến data

**Ví dụ**

`mongorestore -d shopping D:\DO_AN_CNPM\Shopping_web\DataBase\data\shopping`

### Export data
1. Như trên
2. Như trên
3. Gõ vào command: `mongodump -d db_name -o /path/`
	- Với `db_name`: là tên bạn muốn đặt cho database (Ở đây tôi sẽ đặt là shopping)
	- Với `path`: là đường dẫn đến folder muốn lưu

**Ví dụ**

`mongodump -d shopping -o D:\DO_AN_CNPM\Shopping_web\DataBase\data\`

### Run application
1. Install nodejs
- Because our application is written using Javascript, you must install Nodejs in order to run it.
- Go to https://nodejs.org to download and install it following the instructions.
2. Run code
- Clone our source code
	git clone <URL>
- Install package for application
	npm install
- Start application
	npm start
- Go to localhost:3000 to use our application



