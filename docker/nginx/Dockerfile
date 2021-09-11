FROM nginx:1.21.1
COPY  docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY  docker/nginx/cert /etc/nginx/cert
COPY  dist  /usr/share/nginx/html 
EXPOSE 443
