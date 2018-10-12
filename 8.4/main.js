var __main = function() {
    var images = {
        bg: 'img/background.png',
        ground: 'img/ground.png',
        bird: 'img/bird.png',
        pipe_bottom: 'img/pipe_bottom.png',
        pipe_top: 'img/pipe_top.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game)
}

__main()
