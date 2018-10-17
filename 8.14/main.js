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
        mario_move: 'img/mario-move.png',
        mario_idle: 'img/mario-idle.png',
        brick: 'img/brick.png',
        groud: 'img/groud.png',
        question_mark: 'img/question-mark.png',
        grass: 'img/grass.png',
        cloud1: 'img/cloud1.png',
        cloud2: 'img/cloud2.png',

    }
    // let requset = {
    //     url: 'mario.nes',
    //     callback(r) {
    //         window.bytes = new Uint8Array(r)
    //         log('mario.nes', window.bytes.length)
    //         var game = GuaGame.instance(30, images, function(g){
    //             // var s = Scene.new(g)
    //             var s = SceneTitle.new(g)
    //             g.runWithScene(s)
    //         })
    //         enableDebugMode(game)
    //     },
    // }
    // ajax(requset)
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        // var s = SceneTitle.new(g)
        var s = SceneEditor.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game)
}

__main()
