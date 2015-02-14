#!/bin/bash
gunicorn --workers=3 --access-logfile='-' --error-logfile='-' --access-logformat='%(s)s %(b)s "%(f)s" %(t)s "%(r)s"' -t 60 -b 0.0.0.0:5000 app:app
# "127.0.0.1 - - [25/Aug/2013:14:15:48] "GET /statics/liquid/script/front/forms.js HTTP/1.1" 304 - "http://127.0.0.1:5000/store/" "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:20.0) Gecko/20100101 Firefox/20.0"
# %(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"
#h: remote address 
#l: ‘-‘ 
#u: currently ‘-‘, may be user name in future releases 
#t: date of the request r: status line (ex: GET / HTTP/1.1) 
#s: status 
#b: response length or ‘-‘ 
#f: referer 
#a: user agent 
#T: request time in seconds 
#D: request time in microseconds, 
#p: process ID {Header}
#i: request header {Header}
#o: response header


# %(s)s %(b)s "%(f)s" %(t)s "%(r)s"
