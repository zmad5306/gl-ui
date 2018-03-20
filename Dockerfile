FROM httpd:2.4
ADD dist /usr/local/apache2/htdocs/
ADD httpd.conf /usr/local/apache2/conf/httpd.conf