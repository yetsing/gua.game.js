class Brick extends GuaImage {
    constructor(game) {
        super(game, 'brick')
        this.moveCount = 8
        this.vy = -2
    }
    static new(game) {
        return new this(game)
    }
    update() {
        super.update()
        this.moveCount--
        this.y += this.vy
        if (this.moveCount == 0) {
            this.vy = 2
        } else if (this.moveCount == -8) {
            this.dead = true
            this.moveCount = 8
            this.vy = -2
        }
    }
}
