class Bird extends GuaAnimation {
    constructor(game) {
        super(game, 'bird')
        this.setup()
    }
    setup() {
        this.init(animationConfig.bird)
        this.speed = 10
        this.gy = 10
        this.vy = 0
        this.flipX = false
        this.rotation = 0
    }
    update() {
        super.update()
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 480
        if (this.y > h) {
            this.y = h
        }
        // this.rotation += 5
        if (this.rotation <= 45) {
            this.rotation += 5
        }
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.frameWidth / 2
        var h2 = this.frameHeight / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(
            this.img.texture,
            this.frameX, this.frameY,
            this.frameWidth, this.frameHeight,
            0, 0, this.frameWidth, this.frameHeight
        )
        context.restore()
    }
    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed
            this.flipX = true
        }
    }
    moveRight() {
        if (this.x < 366) {
            this.x += this.speed
            this.flipX = false
        }
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
}
