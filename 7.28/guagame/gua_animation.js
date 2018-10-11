class GuaAnimation {
    constructor(game) {
        this.game = game
        this.img = GuaImage.new(game, 'explosion')
        this.frameCount = 3
        this.duration = 30
        this.dead = false
    }
    static new(game) {
        return new this(game)
    }
    init(sx, sy, sWidth, sHeight, dx, dy) {
        this.frameX = sx
        this.frameY = sy
        this.frameWidth = sWidth
        this.frameHeight = sHeight
        this.x = dx
        this.y = dy
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            var x = (this.frameX + this.frameWidth) % this.img.texture.width
            this.frameX = x
        }
        this.duration--
        if (this.duration <= 0) {
            this.dead = true
        }
    }
    draw() {
        this.game.context.drawImage(
            this.img.texture,
            this.frameX, this.frameY,
            this.frameWidth, this.frameHeight,
            this.x, this.y, 40, 40
        )
    }
}
