class Score {
    constructor(game) {
        this.game = game
        this.value = 0
        this.best = 0
        this.dx = config.score.x
        this.dy = config.score.y
        this.sWidth = config.score.sWidth
        this.sHeight = config.score.sHeight
        // this.sx = config.score.cutX[this.value]
        // this.sy = config.score.cutY[this.value]
        this.img = GuaImage.new(game, 'score')
    }
    static new(game) {
        return new this(game)
    }
    update() {
        // this.sWidth = config.score.sWidth[this.value]
        // this.sHeight = config.score.sHeight[this.value]
    }
    draw() {
        if (this.value < 10) {
            var sx = config.score.cutX[this.value]
            var sy = config.score.cutY[this.value]
            this.game.context.drawImage(
                this.img.texture,
                sx, sy,
                this.sWidth, this.sHeight,
                this.dx, this.dy, this.sWidth, this.sHeight
            )
        } else if (this.value < 100) {
            var lowNumber = this.value % 10
            var highNumber = Math.floor(this.value / 10)
            var sx = config.score.cutX[lowNumber]
            var sy = config.score.cutY[lowNumber]
            var dx = this.dx + 20
            this.game.context.drawImage(
                this.img.texture,
                sx, sy,
                this.sWidth, this.sHeight,
                dx, this.dy, this.sWidth, this.sHeight
            )
            sx = config.score.cutX[highNumber]
            sy = config.score.cutY[highNumber]
            dx = this.dx - 20
            this.game.context.drawImage(
                this.img.texture,
                sx, sy,
                this.sWidth, this.sHeight,
                dx, this.dy, this.sWidth, this.sHeight
            )
        }
    }
}
