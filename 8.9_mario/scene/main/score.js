class ScoreLabel extends GuaLabel {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.score = 0
        this.x = 10
        this.y = 30
    }
    update() {
        this.text = '分数：' + this.score
    }
}
