Các bước để import data vào mongodb: (Windows)
1. Cài mongodb community server
2. Mongodb database tools
3. Gõ vào command: mongorestore -d db_name /path/ 
	- Với db_name: là tên bạn muốn đặt cho database (Ở đây tôi sẽ đặt là shopping)
	- Với path: là đường dẫn đến data
	Ví dụ mongorestore -d shopping D:\DO_AN_CNPM\Shopping_web\DataBase\data\shopping 




Các bước export data vào folder
1. Như trên
2. Như trên
3. Gõ vào command: mongodump -d db_name -o /path/
	- Với db_name: là tên bạn muốn đặt cho database (Ở đây tôi sẽ đặt là shopping)
	- Với path: là đường dẫn đến folder muốn lưu
	Ví dụ: mongodump -d shopping -o D:\DO_AN_CNPM\Shopping_web\DataBase\data\ 