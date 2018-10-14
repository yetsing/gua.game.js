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
        this.medal = GuaImage.new(this.game, 'medal_bronze')
        this.img = GuaImage.new(this.game, 'scoreboard')
        this.img.x = 82
        this.img.y = 120
    }
    addScoreAndMedal(score) {
        this.currentScore.text = score.toString()
        this.bestScore.text = bestScore.toString()
        if (score > 500) {
            this.medal = GuaImage.new(this.game, 'medal_platinum')
        } else if(score > 100) {
            this.medal = GuaImage.new(this.game, 'medal_gold')
        } else if(score > 20) {
            this.medal = GuaImage.new(this.game, 'medal_silver')
        } else {
            this.medal = GuaImage.new(this.game, 'medal_bronze')
        }
        this.medal.x = 114
        this.medal.y = 232
    }
    update() {
        // this.currentScore.x = pipeConfig.score_x.value
        // this.currentScore.y = pipeConfig.score_y.value
        // this.bestScore.x = pipeConfig.score_x.value
        // this.bestScore.y = pipeConfig.best_y.value
        // this.medal.x = pipeConfig.medal_x.value
        // this.medal.y = pipeConfig.medal_y.value
    }
    draw() {
        if (this.game.end) {
            this.game.drawImage(this.img)
            this.currentScore.draw()
            this.bestScore.draw()
            this.medal.draw()
        }
    }
}
