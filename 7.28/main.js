var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        fire: 'img/fire.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        var s = Scene.new(g)
        // var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game)
}

__main()
