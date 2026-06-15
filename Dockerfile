FROM nginx:alpine

RUN apk add --no-cache python3

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY file_api.py /file_api.py
COPY bootstrap.sh /bootstrap.sh

RUN mkdir -p /srv/files && chmod +x /bootstrap.sh

EXPOSE 80 8080

ENTRYPOINT ["/bootstrap.sh"]
