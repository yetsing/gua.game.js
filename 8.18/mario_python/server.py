import socket
import urllib.parse
import _thread


from routes import (
    error,
    static,
)

from routes_mario import route_dict as mario_routes


def log(*args, **kwargs):
    return


# 定义一个 class 用于保存请求的数据
class Request(object):
    def __init__(self, raw_data):
        # 只能 split 一次，因为 body 中可能有换行
        header, self.body = raw_data.split('\r\n\r\n', 1)
        h = header.split('\r\n')

        parts = h[0].split()
        self.method = parts[0]
        path = parts[1]
        self.path = ""
        self.query = {}
        self.parse_path(path)
        log('Request: path 和 query', self.path, self.query)

        self.headers = {}
        self.cookies = {}
        self.add_headers(h[1:])
        log('Request: headers 和 cookies', self.headers, self.cookies)

    def add_headers(self, header):
        """
        Cookie: user=gua
        """
        lines = header
        for line in lines:
            k, v = line.split(': ', 1)
            self.headers[k] = v

        if 'Cookie' in self.headers:
            cookies = self.headers['Cookie']
            k, v = cookies.split('=')
            self.cookies[k] = v

    def form(self):
        body = urllib.parse.unquote_plus(self.body)
        log('form', self.body)
        log('form', body)
        args = body.split('&')
        f = {}
        log('args', args)
        for arg in args:
            k, v = arg.split('=')
            f[k] = v
        log('form() 字典', f)
        return f

    def parse_path(self, path):
        """
        输入: /gua?message=hello&author=gua
        返回
        (gua, {
            'message': 'hello',
            'author': 'gua',
        })
        """
        index = path.find('?')
        if index == -1:
            self.path = path
            self.query = {}
        else:
            path, query_string = path.split('?', 1)
            args = query_string.split('&')
            query = {}
            for arg in args:
                k, v = arg.split('=')
                query[k] = v
            self.path = path
            self.query = query


def response_for_path(request):
    """
    根据 path 调用相应的处理函数
    没有处理的 path 会返回 404
    """
    r = {
        '/static': static,
    }
    # 注册外部的路由
    r.update(mario_routes())
    response = r.get(request.path, error)
    return response(request)

# def routes_dict_for_file(file):
#     routes_dict = {}
#     functions = inspect.getmembers(file, inspect.isfunction)
#     parts = file.__name__.split('_')
#     # index 和 static 没有前缀
#     if len(parts) == 2:
#         prefix = '/{}'.format(parts[1])
#     else:
#         prefix = ''
#     for r in functions:
#         name = r[0].replace('_', '/')
#         url = '{}/{}'.format(prefix, name)
#         routes_dict[url] = r[1]
#     return routes_dict
#
#
# def response_for_path_advanced(request):
#     """
#     装饰器的局限性
#     """
#     routes_dict = {}
#
#     for f in [routes, routes_user]:
#         r = routes_dict_for_file(f)
#         routes_dict.update(r)
#
#     # r = {k:login_required(v) for (k,v) in r.items()}
#     for k, v in routes_dict_for_file(routes_todo).items():
#         routes_dict[k] = login_required(v)
#
#     log('auto routes', routes_dict)
#     response = routes_dict.get(request.path, error)
#     return response(request)


def receive_request(connection):
    buffer_size = 1024
    req = b''
    while True:
        r = connection.recv(buffer_size)
        req += r
        if len(r) < buffer_size:
            return req


def process_request(connection):
    with connection:
        r = receive_request(connection)
        log('request log:\n <{}>'.format(r))
        r = r.decode()
        # 把原始请求数据传给 Request 对象
        request = Request(r)
        # 用 response_for_path 函数来得到 path 对应的响应内容
        response = response_for_path(request)
        log("response log:\n <{}>".format(response))
        # 把响应发送给客户端
        connection.sendall(response)


def run(host, port):
    """
    启动服务器
    """
    # 初始化 socket 套路
    # 使用 with 可以保证程序中断的时候正确关闭 socket 释放占用的端口
    log('开始运行于', '{}:{}'.format(host, port))
    with socket.socket() as s:
        s.bind((host, port))
        # 监听 接受 读取请求数据 解码成字符串
        s.listen()
        # 无限循环来处理请求
        while True:
            connection, address = s.accept()
            # 第二个参数类型必须是 tuple
            log('ip {}'.format(address))
            _thread.start_new_thread(process_request, (connection,))


if __name__ == '__main__':
    # 生成配置并且运行程序
    config = dict(
        host='127.0.0.1',
        port=3000,
    )
    run(**config)
