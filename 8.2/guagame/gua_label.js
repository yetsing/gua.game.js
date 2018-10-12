class GuaLabel {
    constructor(game) {
        this.game = game
        this.text = ''
        this.x = 0
        this.y = 0
    }
    static new(game) {
        return new this(game)
    }
    update() {

    }
    draw() {
        this.game.context.font="20px Verdana"
        this.game.context.fillText(this.text, this.x, this.y)
    }
}
