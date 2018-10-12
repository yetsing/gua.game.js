class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = pipeConfig.pipe_space.value
        this.pipeDistance = pipeConfig.pipe_distance.value
        this.columnsOfPipe = 3
        for (var i = 0; i < 3; i++) {
            var p1 = GuaImage.new(game, 'pipe_top')
            var p2 = GuaImage.new(game, 'pipe_bottom')
            p1.x = 500 + i * this.pipeDistance
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-300, 10)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.pipeSpace = pipeConfig.pipe_space.value
        this.pipeDistance = pipeConfig.pipe_distance.value
    }
    update() {
        for (var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -72) {
                p1.x += this.columnsOfPipe * this.pipeDistance
            }
            if (p2.x < -72) {
                p2.x += this.columnsOfPipe * this.pipeDistance
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        for (var p of this.pipes) {
            p.draw()
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'bg')
        this.pipe = Pipes.new(this.game)
        this.ground = Ground.new(this.game)
        this.bird = Bird.new(this.game)
        this.addElement(this.bg)
        this.addElement(this.pipe)
        this.addElement(this.ground)
        this.addElement(this.bird)
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.bird.moveLeft()
        })
        g.registerAction('d', function(){
            s.bird.moveRight()
        })
        g.registerAction('w', function(){
            s.bird.jump()
        })
    }
    hit() {
        for (var p of this.pipe.pipes) {
            if (this.bird.live && rectIntersects(p, this.bird)) {
                log('bird hit pipe')
                this.bird.live = false
            }
        }
        if (this.bird.y == 480) {
            this.bird.live = false
        }
    }
    update() {
        super.update()
        this.hit()
        if (!this.bird.live) {
            this.game.scene = SceneEnd.new(this.game)
        }
    }
}
