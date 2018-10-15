const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}

var __main = function() {
    var images = {
        bg: 'img/background.png',
        ground: 'img/ground.png',
    }
    let requset = {
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log('mario.nes', window.bytes.length)
            var game = GuaGame.instance(30, images, function(g){
                // var s = Scene.new(g)
                var s = SceneTitle.new(g)
                g.runWithScene(s)
            })
            enableDebugMode(game)
        },
    }
    ajax(requset)
}

__main()
