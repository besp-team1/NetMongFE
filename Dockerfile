
##########################
# nginx 이미지를 사용
FROM nginx

# work dir
WORKDIR /

CMD ["pwd"]

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
COPY /var/jenkins_home/workspace/nm_FE/build usr/share/nginx/html

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 복사
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 앱이 3000 포트에서 실행되도록 설정
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
