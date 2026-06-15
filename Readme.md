# static file servings 
this docker container is  a simple container that is meant to be minimal just to serve static files over a domain in a k8s cluster deployment . 

---

## file structure 
1. boostrap.sh
this is the entry point of the application , and it's used to run both the python API and the nginx web server at the same time . 
2. Dockerfile 
is used to build the docker container . 
3. fileapi.py 
is the service managing the files . 
4. nginx.conf 
is the nginx configs to serve the files over http on port 80 . 

--- 

## commands used 
```bash
# Upload a file
curl -X POST http://localhost:8080/hello.md  --data-binary @hello.md

# Delete a file
curl -X DELETE http://localhost:8080/hello.md

# List files
curl http://localhost:8080/

# View the file via Nginx
curl http://localhost:80/hello.md
```
