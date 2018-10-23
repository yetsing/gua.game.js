class Mario extends GuaAnimation {
    constructor(game) {
        super(game)
        this.setup()
        this.init(config[this.status])
    }
    setup() {
        this.x = 200
        this.y = 385
        this.interval = 6
        this.speed = 5
        this.vy = 0
        this.gy = 5
        // 加速和摩擦
        this.vx = 0
        this.mx = 0
        // 最大速度
        this.maxSpeed = 10
        this.status = 'mario_idle'
        this.imagesPerStatus = {
            mario_idle: GuaImage.new(this.game, 'mario_idle'),
            mario_move: GuaImage.new(this.game, 'mario_move'),
        }
        this.img = this.imagesPerStatus[this.status]
    }
    update() {
        super.update()
        // this.x = control.x.value
        // this.y = control.y.value
        // if (this.game.paused) {
        //     return
        // }
        this.x += this.vx
        this.limitPosition()
        // 更新 X 加速和摩擦
        this.vx += this.mx
        if (this.mx != 0) {
            this.updateInterval(-0.1)
        }
        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        }
        if (this.vx == 0) {
            this.change_status('mario_idle')
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
        // this.x -= this.speed
        this.flipX = true
        if (keyStatus == 'down') {
            this.change_status('mario_move')
            this.vx -= 0.2
            this.vx = this.vx < -this.maxSpeed ? -this.maxSpeed:this.vx
            this.mx = 0
            this.updateInterval(0.1)
        } else {
            this.mx = 0.1
        }
    }
    moveRight(keyStatus) {
        this.flipX = false
        if (keyStatus == 'down') {
            this.change_status('mario_move')
            this.vx += 0.2
            this.vx = this.vx > this.maxSpeed ? this.maxSpeed:this.vx
            this.mx = 0
            this.updateInterval(0.1)
        } else {
            this.mx = -0.1
        }
    }
    jump(keyStatus) {
        this.vy = -10
    }
    limitPosition() {
        if (this.x < 0) {
            this.x = 0
            this.vx = 0
            this.mx = 0
        } else if (this.x > 500) {
            this.x = 500
            this.vx = 0
            this.mx = 0
        }
    }
    updateInterval(a) {
        this.interval -= a
        if (this.interval < 2) {
            this.interval = 2
        } else if (this.interval > 6) {
            this.interval = 6
        }
    }
    change_status(status) {
        if (this.status != status) {
            this.status = status
            this.img = this.imagesPerStatus[this.status]
            this.init(config[this.status])
        }
    }
}
