# Docker Setup for Mysql 5.6

```
docker pull mysql:5.6
docker run --name mysql1 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:5.6
docker exec -it mysql1 bash
mysql -u root -p
->Enter Password: root
use product
```
