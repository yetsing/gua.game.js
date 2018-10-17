class Mario extends GuaAnimation {
    constructor(game, name) {
        super(game, 'mario_move')
        this.setup()
        this.init(config.mario_move)
    }
    setup() {
        this.interval = 6
        this.speed = 5
        this.vy = 0
        this.gy = 5
        // 加速和摩擦
        this.vx = 0
        this.mx = 0
    }
    update() {
        super.update()
        // this.x = control.x.value
        // this.y = control.y.value
        // if (this.game.paused) {
        //     return
        // }
        this.x += this.vx
        // 更新 X 加速和摩擦
        this.vx += this.mx
        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        }
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 385
        if (this.y > h) {
            this.y = h
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
        context.translate(-w2, -h2)
        context.drawImage(
            this.img.texture,
            this.frameX, this.frameY,
            this.frameWidth, this.frameHeight,
            0, 0, this.frameWidth, this.frameHeight
        )
        context.restore()
    }
    moveLeft(keyStatus) {
        if (this.x > 0) {
            // this.x -= this.speed
            this.flipX = true
            if (keyStatus == 'down') {
                this.vx -= 0.2
            } else {
                this.mx = 0.1
            }
        }
    }
    moveRight(keyStatus) {
        if (this.x < 366) {
            this.flipX = false
            if (keyStatus == 'down') {
                this.vx += 0.2
            } else {
                this.mx = -0.1
            }
        }
    }
    jump(keyStatus) {
        this.vy = -10
    }
}
