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
            p1.passed = false
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
        if (this.game.paused | this.game.end) {
            return
        }
        for (var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -72) {
                p1.passed = false
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
