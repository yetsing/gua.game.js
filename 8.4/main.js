var __main = function() {
    var images = {
        bg: 'img/background.png',
        ground: 'img/ground.png',
        bird: 'img/bird.png',
        pipe_bottom: 'img/pipe_bottom.png',
        pipe_top: 'img/pipe_top.png',
        score: 'img/number.png',
        scoreboard: 'img/scoreboard.png',
        medal_bronze: 'img/medal_bronze.png',
        medal_silver: 'img/medal_silver.png',
        medal_gold: 'img/medal_gold.png',
        medal_platinum: 'img/medal_platinum.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game)
}

__main()
