from routes import (
    redirect,
    GuaTemplate,
    html_response,
)


def index(request):
    body = GuaTemplate.render('map_editor.html')
    return html_response(body)


def save_map(request):
    data = 'guaMapData = `' + request.body + '`'
    path = 'C:\\Users\\ljhua\\GitHub\\gua.game.js\\8.18\\guagame\\gua_map_data.js'
    # print('data', data)
    with open(path, 'w+', encoding='utf-8') as f:
        # log('save', path, s, data)
        f.write(data)
        print('write success')
    return redirect('/')


def route_dict():
    """
    路由字典
    key 是路由(路由就是 path)
    value 是路由处理函数(就是响应)
    """
    d = {
        '/': index,
        '/save': save_map,
    }
    return d
