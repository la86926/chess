# Firestore simulado para pruebas de sincronización entre "dispositivos" (contextos del navegador).
# GET /doc/<id> -> {exists, data, version}; POST /doc/<id> {data, merge, expected} -> {ok, version}
import json, threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
DB = {}; LOCK = threading.Lock()
def fusion(a, b):
    out = dict(a)
    for k, v in b.items(): out[k] = v
    return out
class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def _send(self, obj, code=200):
        b = json.dumps(obj).encode()
        self.send_response(code); self.send_header('Content-Type','application/json')
        self.send_header('Access-Control-Allow-Origin','*'); self.send_header('Content-Length',str(len(b))); self.end_headers(); self.wfile.write(b)
    def do_OPTIONS(self):
        self.send_response(204); self.send_header('Access-Control-Allow-Origin','*'); self.send_header('Access-Control-Allow-Headers','*'); self.send_header('Access-Control-Allow-Methods','GET,POST,DELETE'); self.end_headers()
    def do_GET(self):
        i = self.path.split('/doc/')[-1]
        with LOCK:
            d = DB.get(i)
            self._send({'exists': d is not None, 'data': d['data'] if d else None, 'version': d['v'] if d else 0})
    def do_DELETE(self):
        i = self.path.split('/doc/')[-1]
        with LOCK: DB.pop(i, None)
        self._send({'ok': True})
    def do_POST(self):
        i = self.path.split('/doc/')[-1]
        n = int(self.headers.get('Content-Length', 0)); body = json.loads(self.rfile.read(n) or b'{}')
        with LOCK:
            d = DB.get(i)
            v = d['v'] if d else 0
            if body.get('expected') is not None and body['expected'] != v:
                return self._send({'ok': False, 'conflict': True, 'version': v})
            data = fusion(d['data'], body['data']) if (d and body.get('merge')) else body['data']
            DB[i] = {'data': data, 'v': v + 1}
            self._send({'ok': True, 'version': v + 1})
ThreadingHTTPServer(('127.0.0.1', 8799), H).serve_forever()
