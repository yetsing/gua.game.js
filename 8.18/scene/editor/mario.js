class Mario extends GuaAnimation {
    constructor(game, map) {
        super(game)
        this.map = map
        this.setup()
        this.init(marioConfig[this.status])
    }
    setup() {
        this.x = 100
        this.y = 352
        this.interval = 6
        this.speed = 5
        this.vy = 0
        this.gy = 2
        // 加速和摩擦
        this.vx = 0
        this.ax = 0
        this.mx = 0
        //  空中和地面所受的摩擦力
        // this.mxValues = {
        //     'move': 0.9,
        //     'jump': 0.3,
        // }
        // 最大速度
        this.maxSpeed = 10
        this.jumpCount = 20
        this.canJump = true
        this.status = 'idle'
        this.imagesPerStatus = {
            idle: GuaImage.new(this.game, 'mario_idle'),
            move: GuaImage.new(this.game, 'mario_move'),
            jump: GuaImage.new(this.game, 'mario_jump'),
            turn: GuaImage.new(this.game, 'mario_turn')
        }
        this.img = this.imagesPerStatus[this.status]
        this.tileSize = this.map.tileSize
    }
    onTheGround() {
        let offset = -this.map.offsetX
        // 左下角
        let i1 = Math.floor((this.x + offset) / this.tileSize)
        // 右下角
        let i2 = Math.floor((this.x + offset) / this.tileSize) + 1
        let j = Math.floor(this.y / this.tileSize) + 2
        let result = this.map.onTheGround(i1, j) || this.map.onTheGround(i2, j)
        return result
    }
    //  更新水平方向受力
    updateAtHorizontal() {
        // this.limitPosition()
        // 更新 X 加速和摩擦
        this.vx += this.ax + this.mx
        if (Math.abs(this.vx) > this.maxSpeed) {
            this.vx = parseInt(this.vx)
        }
        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        }
    }
    updateGravity() {
        let onTheGround = this.onTheGround()
        if (onTheGround && this.vy > 0) {
            this.vy = 0
            this.y = Math.floor(this.y / this.tileSize) * this.tileSize
            this.canJump = true
        } else {
            this.vy += this.gy * 0.2
            // if (this.onTheGround) {
            //     this.y = (j - 2) * this.tileSize
            // }
        }
    }
    // 更新摩擦力
    updateRub() {
        var factor = 0
        if (this.vx > 0) {
            factor = -1
        } else if (this.vx < 0) {
            factor = 1
        } else {
            factor = 0
        }
        this.mx = 0.2 * factor
        let onTheGround = this.onTheGround()
        if (this.ax == 0 && onTheGround) {
            this.mx = 0.9 * factor
        }
    }
    updatePosition() {
        this.x += this.vx
        if (this.x <= 0) {
            this.x = 0
            this.vx = 0.5 * this.vx
        } else if (this.x >= 198) {
            this.x = 198
            this.map.speed = Math.max(this.vx, 0)
        }
        this.y += this.vy
    }
    updateStatus() {
        let onTheGround = this.onTheGround()
        if (onTheGround) {
            if (this.vx == 0) {
                this.changeStatus('idle')
            } else if (this.vx * this.ax > 1.4) {
                this.changeStatus('move')
            } else if (this.vx * this.ax < -1.4) {
                this.changeStatus('turn')
            }
        } else {
            this.changeStatus('jump')
        }
    }
    update() {
        super.update()
        // this.x = control.x.value
        // this.y = control.y.value
        // if (this.game.paused) {
        //     return
        // }
        this.interval = 6 - 0.4 * Math.abs(this.vx)
        this.updateAtHorizontal()
        this.updateRub()
        this.updateGravity()
        this.updatePosition()
        this.updateStatus()
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
        if (keyStatus == 'down') {
            if (this.status == 'jump') {
                this.vx = this.vx || -5
            } else {
                this.flipX = true
                this.ax = -0.7
            }
        } else {
            this.ax = 0
        }
    }
    moveRight(keyStatus) {
        if (keyStatus == 'down') {
            if (this.status == 'jump') {
                this.vx = this.vx || 5
            } else {
                this.flipX = false
                this.ax = 0.7
            }
        } else {
            this.ax = 0
        }
    }
    jump(keyStatus) {
        // this.changeStatus('jump')
        if (keyStatus == 'down') {
            if (this.jumpCount == 0) {
                this.canJump = false
            }
            if (this.canJump) {
                this.y -= 12
                this.jumpCount--
            }
        } else {
            this.canJump = false
            this.jumpCount = 15
        }
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
    changeStatus(status) {
        if (this.status != status) {
            this.status = status
            this.img = this.imagesPerStatus[this.status]
            this.init(marioConfig[this.status])
        }
    }
}
