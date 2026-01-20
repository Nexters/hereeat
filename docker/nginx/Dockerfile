FROM nginx:latest

# Default Configuration 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# Configuration 파일 복사
COPY ./config/client.conf /etc/nginx/conf.d/client.conf
COPY ./config/nginx.conf /etc/nginx/nginx.conf

# 로그 디렉토리 생성
RUN mkdir -p /var/log/nginx/client

CMD ["nginx", "-g", "daemon off;"]