class ScoreBoard {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.currentScore = GuaLabel.new(this.game)
        this.currentScore.x = 264
        this.currentScore.y = 242
        this.bestScore = GuaLabel.new(this.game)
        this.bestScore.x = 264
        this.bestScore.y = 283
        this.img = GuaImage.new(this.game, 'scoreboard')
        this.img.x = 82
        this.img.y = 120
    }
    addScore(score) {
        this.currentScore.text = score.toString()
        this.bestScore.text = bestScore.toString()
    }
    update() {
        // this.currentScore.x = pipeConfig.score_x.value
        // this.currentScore.y = pipeConfig.score_y.value
        // this.bestScore.x = pipeConfig.score_x.value
        // this.bestScore.y = pipeConfig.best_y.value
    }
    draw() {
        if (this.game.end) {
            this.game.drawImage(this.img)
            this.currentScore.draw()
            this.bestScore.draw()
        }
    }
}
