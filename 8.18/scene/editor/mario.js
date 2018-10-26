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
        this.ay = 9
        this.gy = 3.5
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
        this.maxSpeed = 8
        // this.jumpCount = 75
        this.keyUp = true
        this.canJump = true
        this.jumpMove = true
        this.jumpCount = 9
        this.status = 'idle'
        this.imagesPerStatus = {
            idle: GuaImage.new(this.game, 'mario_idle'),
            move: GuaImage.new(this.game, 'mario_move'),
            jump: GuaImage.new(this.game, 'mario_jump'),
            turn: GuaImage.new(this.game, 'mario_turn')
        }
        this.img = this.imagesPerStatus[this.status]
        this.tileSize = this.map.tileSize
        this.hitStatus = 'move'
        this.hit = false
    }
    onTheGround() {
        // 左下角
        let i1 = Math.floor((this.x + this.offsetX + 2) / this.tileSize)
        // 右下角
        let i2 = Math.floor((this.x + this.offsetX - 2) / this.tileSize) + 1
        let j = Math.floor(this.y / this.tileSize) + 2
        let result = this.map.hitObstacle(i1, j) || this.map.hitObstacle(i2, j)
        return result
    }
    //  跳起碰到砖块
    hitWithHead() {
        // 左上角
        let i1 = Math.floor((this.x + this.offsetX + 2) / this.tileSize)
        // 右上角
        let i2 = Math.floor((this.x + this.offsetX - 2) / this.tileSize) + 1
        let j = Math.floor(this.y / this.tileSize)
        let result = this.map.hitObstacle(i1, j) || this.map.hitObstacle(i2, j)
        return result
    }
    // 向左走碰撞
    hitLeft() {
        var i = Math.floor((this.x + this.offsetX) / this.tileSize)
        let j1 = Math.floor(this.y / this.tileSize)
        let j2 = Math.floor(this.y / this.tileSize) + 1
        let j3 = Math.floor((this.y - 2) / this.tileSize) + 2
        let result = this.map.hitObstacle(i, j1) || this.map.hitObstacle(i, j2) || this.map.hitObstacle(i, j3)
        // if (result) {
        //     this.x = i * this.tileSize - this.offsetX
        // }
        return result
    }
    // 向右走碰撞
    hitRight() {
        let i = Math.floor((this.x + this.offsetX) / this.tileSize) + 1
        let j1 = Math.floor(this.y / this.tileSize)
        let j2 = Math.floor(this.y / this.tileSize) + 1
        let j3 = Math.floor((this.y - 2) / this.tileSize) + 2
        let result = this.map.hitObstacle(i, j1) || this.map.hitObstacle(i, j2) || this.map.hitObstacle(i, j3)
        if (result) {
            this.x = (i - 1) * this.tileSize - this.offsetX
        }
        return result
    }
    updateGravity() {
        let onTheGround = this.onTheGround()
        if (onTheGround && this.vy >= 0) {
            this.vy = 0
            this.y = Math.floor(this.y / this.tileSize) * this.tileSize
            this.canJump = this.keyUp
            this.jumpMove = true
            this.hit = this.hitStatus == 'jump'
        } else if (this.hitWithHead()) {
            log('hit head')
            this.vy = 5
            this.hit = this.hitStatus == 'jump'
            // let y = Math.floor(this.y / this.tileSize) * this.tileSize
            // this.y = Math.min(this.y, y)
        } else {
            this.vy += this.gy
            this.vy = Math.min(this.vy, 20)
            // if (this.onTheGround) {
            //     this.y = (j - 2) * this.tileSize
            // }
        }
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
        if (this.hit) {
            return
        }
        if (this.hitLeft() && this.vx < 0) {
            this.vx = 0
            // this.x = Math.floor(this.x / this.tileSize) * this.tileSize
        } else if (this.hitRight() && this.vx > 0) {
            this.vx = 0
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
        this.mx = 0.3 * factor
        let onTheGround = this.onTheGround()
        if (this.ax == 0 && onTheGround) {
            this.mx = 0.7 * factor
        }
    }
    updatePosition() {
        this.x += this.vx
        if (this.x <= 0) {
            this.x = 0
            this.vx = 0.5 * this.vx
            // this.map.speed = Math.min(this.vx, 0)
        } else if (this.x >= 198) {
            this.x = 198
            this.map.speed = Math.max(this.vx, 0)
        } else {
            this.map.speed = 0
        }
        this.y += this.vy
    }
    updateStatus() {
        let onTheGround = this.onTheGround()
        if (onTheGround) {
            if (this.vx == 0 && this.ax == 0) {
                this.changeStatus('idle')
            } else if (this.vx * this.ax < -1.4) {
                this.changeStatus('turn')
            } else {
                this.changeStatus('move')
            }
            this.hitStatus = 'move'
        } else {
            this.changeStatus('jump')
            this.hitStatus = 'jump'
            // this.canJump = false
        }
    }
    updateControl() {
        this.gy = control.gy.value
        this.jumpSpeed = control.jump_speed.value
    }
    update() {
        super.update()
        this.updateControl()
        // this.x = control.x.value
        // this.y = control.y.value
        // if (this.game.paused) {
        //     return
        // }
        this.offsetX = -this.map.offsetX
        this.interval = 6 - 0.4 * Math.abs(this.vx)
        this.updateGravity()
        this.updateAtHorizontal()
        this.updateRub()
        this.updatePosition()
        this.updateStatus()
        this.his = false
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
    move(a, s) {
        if (this.status == 'jump') {
            if (this.jumpMove) {
                log('jumpMove')
                this.vx = this.vx || s
                this.jumpMove = false
            }
        } else {
            this.flipX = a < 0
            this.ax = a
        }
    }
    moveLeft(keyStatus) {
        if (keyStatus == 'down') {
            this.move(-0.6, -4)
        } else {
            this.ax = 0
        }
    }
    moveRight(keyStatus) {
        if (keyStatus == 'down') {
            this.move(0.6, 4)
        } else {
            this.ax = 0
        }
    }
    jump(keyStatus) {
        // this.changeStatus('jump')
        if (keyStatus == 'down') {
            this.vy -= this.ay
            this.ay--
            this.jumpMove = this.vx == 0
            // this.keyUp = false
            // if (this.canJump) {
            //     this.vy -= this.ay
            //     this.ay--
            //     this.jumpMove = this.vx == 0
            // }
        } else {
            this.ay = 9
            this.keyUp = true
            // this.jumpCount = 9
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
