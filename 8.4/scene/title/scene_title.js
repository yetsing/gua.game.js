class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
        game.registerAction('s', function(){
            game.paused = false
        })
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.paused = true
            game.end = false
            game.replaceScene(s)
        })
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'bg')
        this.pipe = Pipes.new(this.game)
        this.ground = Ground.new(this.game)
        this.bird = Bird.new(this.game)
        this.score = Score.new(this.game)
        this.scoreBoard = ScoreBoard.new(this.game)
        this.addElement(this.bg)
        this.addElement(this.pipe)
        this.addElement(this.ground)
        this.addElement(this.bird)
        this.addElement(this.score)
        this.addElement(this.scoreBoard)
    }
    setupInputs() {
        var g = this.game
        var s = this
        // g.registerAction('a', function(){
        //     s.bird.moveLeft()
        // })
        // g.registerAction('d', function(){
        //     s.bird.moveRight()
        // })
        g.registerAction('w', function(){
            s.bird.jump()
        })
    }
    hit() {
        for (var p of this.pipe.pipes) {
            if (this.bird.live && rectIntersects(p, this.bird)) {
                this.bird.live = false
            }
        }
        if (this.bird.y == 480) {
            this.bird.live = false
        }
    }
    passPipe() {
        for (var i = 0; i < this.pipe.pipes.length; i += 2) {
            var p = this.pipe.pipes[i]
            if (!p.passed && this.bird.x > p.x) {
                this.score.value += 1
                p.passed = true
            }
        }
    }
    updateBest() {
        if (this.score.value > bestScore) {
            bestScore = this.score.value
        }
    }
    gameOver() {
        this.game.end = true
        this.updateBest()
        this.scoreBoard.addScoreAndMedal(this.score.value)
    }
    update() {
        super.update()
        this.hit()
        this.passPipe()
        if (!this.bird.live) {
            this.gameOver()
        }
    }
}
