import http.server, os, json

FILES_DIR = "/srv/files"

class Handler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):   # Upload a file
        filename = os.path.basename(self.path.lstrip("/"))
        length = int(self.headers["Content-Length"])
        data = self.rfile.read(length)
        with open(os.path.join(FILES_DIR, filename), "wb") as f:
            f.write(data)
        self._respond(200, {"status": "uploaded", "file": filename})

    def do_DELETE(self):  # Delete a file
        filename = os.path.basename(self.path.lstrip("/"))
        target = os.path.join(FILES_DIR, filename)
        if os.path.exists(target):
            os.remove(target)
            self._respond(200, {"status": "deleted", "file": filename})
        else:
            self._respond(404, {"error": "not found"})

    def do_GET(self):     # List files
        files = os.listdir(FILES_DIR)
        self._respond(200, {"files": files})

    def _respond(self, code, body):
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(body).encode())

    def log_message(self, *args): pass  # silence logs

http.server.HTTPServer(("", 8080), Handler).serve_forever()
