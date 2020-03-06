FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
ADD nginx.conf /etc/nginx/

ADD dist /usr/share/nginx/html/
ADD dist /var/www/html/

# Expose ports
EXPOSE 90

