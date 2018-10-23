class GuaAnimation {
    constructor(game) {
        this.game = game
        // this.img = GuaImage.new(game, name)
        this.x = 0
        this.y = 0
        this.interval = 3
        this.frameCount = this.interval
        this.frameIndex = 0
    }
    static new(game) {
        return new this(game)
    }
    init(config) {
        this.frameX = config.frameX[0]
        this.frameY = config.frameY[0]
        this.frameWidth = config.frameWidth
        this.frameHeight = config.frameHeight
        this.config = config
    }
    update() {
        this.frameCount--
        if (this.frameCount <= 0) {
            this.frameCount = this.interval
            this.frameIndex++
            this.frameIndex %= this.config.frameX.length
            this.frameX = this.config.frameX[this.frameIndex]
            this.frameY = this.config.frameY[this.frameIndex]
        }
    }
    draw() {
        this.game.context.drawImage(
            this.img.texture,
            this.frameX, this.frameY,
            this.frameWidth, this.frameHeight,
            this.x, this.y, this.frameWidth, this.frameHeight
        )
    }
}
