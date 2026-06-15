#!/bin/sh
python3 /file_api.py &
nginx -g "daemon off;"
