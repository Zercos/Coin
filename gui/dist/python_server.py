#!/usr/bin/env python

import http.server, ssl

server_address = ('0.0.0.0', 8880)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket,
                               server_side=True,
                               certfile='/home/maks/.config/https/localhost.pem',
                               ssl_version=ssl.PROTOCOL_TLS)
httpd.serve_forever()
