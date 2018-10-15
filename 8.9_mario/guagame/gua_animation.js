class GuaAnimation {
    constructor(game, name) {
        this.game = game
        this.img = GuaImage.new(game, name)
        this.frameX = 0
        this.frameY = 0
        this.frameCount = 3
        this.duration = 30
        this.permanent = true
        this.dead = false
    }
    static new(game, name) {
        return new this(game, name)
    }
    init(config) {
        this.frameWidth = config.width
        this.frameHeight = config.height
        this.x = config.x
        this.y = config.y
        this.moveDirection = config.moveDirection
        var distance = {
            x: this.frameWidth,
            y: this.frameHeight,
        }
        this.distance = distance[config.moveDirection]
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            if (this.moveDirection == 'x') {
                var x = (this.frameX + this.distance) % this.img.texture.width
                this.frameX = x
            } else if(this.moveDirection == 'y') {
                var y = (this.frameY + this.distance) % this.img.texture.height
                this.frameY = y
            }
        }
        this.duration--
        if (this.duration <= 0 && !this.permanent) {
            this.dead = true
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
