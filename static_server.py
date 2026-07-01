import traceback
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    try:
        server = ThreadingHTTPServer(("127.0.0.1", 8788), QuietHandler)
        server.serve_forever()
    except Exception:
        with open("static_server.err.log", "w", encoding="utf-8") as fh:
            traceback.print_exc(file=fh)
