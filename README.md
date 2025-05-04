
## Running Front-End with Docker

### Build the Docker Image
```bash
docker build -t university-api-frontend1 ./frontend

```
##To run the Front-end container

```bash

docker run -d -p 3000:3000 university-api-frontend1



```

### 🔁 **2. Load Balancer Setup (Round-Robin + Health Checks)**

## Load Balancer Configuration

We are using **Nginx** as the load balancer, configured to use the **round-robin** algorithm. Here's a snippet of the config:

```bash
nginx
upstream frontend {
    server frontend1:3000;
    server frontend2:3000;
    server frontend3:3000;
}

server {
    listen 80;

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```


## Health  checks
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
  interval: 30s
  timeout: 10s
  retries: 3
