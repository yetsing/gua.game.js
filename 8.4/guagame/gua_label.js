class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
        this.x = 110
        this.y = 110
    }
    static new(game, text) {
        return new this(game, text)
    }
    update() {

    }
    draw() {
        this.game.context.font="20px Verdana"
        this.game.context.fillText(this.text, this.x, this.y)
    }
}
