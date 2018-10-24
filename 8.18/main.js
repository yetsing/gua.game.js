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
        mario_jump: 'img/mario-jump.png',
        mario_turn: 'img/mario-turn.png',
        brick: 'img/brick.png',
        ground: 'img/ground.png',
        question_mark: 'img/question-mark.png',
        square: 'img/square.png',
        cloud1: 'img/cloud1.png',
        cloud2: 'img/cloud2.png',
        cloud3: 'img/cloud3.png',
        cloud4: 'img/cloud4.png',
        grass1: 'img/grass1.png',
        grass2: 'img/grass2.png',
        grass3: 'img/grass3.png',
        mount1: 'img/mount1.png',
        mount2: 'img/mount2.png',
        mount3: 'img/mount3.png',
        mount4: 'img/mount4.png',
        mount5: 'img/mount5.png',
        mount6: 'img/mount6.png',
        pipe1: 'img/pipe1.png',
        pipe2: 'img/pipe2.png',
        pipe3: 'img/pipe3.png',
        pipe4: 'img/pipe4.png',
        castle1: 'img/castle1.png',
        castle2: 'img/castle2.png',
        castle3: 'img/castle3.png',
        castle4: 'img/castle4.png',
        castle5: 'img/castle5.png',
        castle6: 'img/castle6.png',
        castle7: 'img/castle7.png',
        flagpole1: 'img/flagpole1.png',
        flagpole2: 'img/flagpole2.png',
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
