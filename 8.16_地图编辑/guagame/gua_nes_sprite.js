class GuaNesSprite {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.tileOffset = 32784
        this.data = window.bytes.slice(this.tileOffset)
        this.pixelWidth = 2
        this.rowsOfSprite = 2
        this.columnsOfSprite = 4
        this.w = this.pixelWidth * this.rowsOfSprite * 8
        this.h = this.pixelWidth * this.columnsOfSprite * 8
        this.speed = 10
        this.gy = 10
        this.vy = 0
        this.flipX = false
        this.frameCount = 4
        this.frameIndex = 0
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
    }
    drawBlock(context, data, x, y, pixelWidth) {
        const colors = [
            'rgba(255, 255, 255, 1)',
            'rgba(224, 80, 0, 1)',
            'rgba(255, 160, 0, 1)',
            'rgba(136, 138, 0, 1)',
        ]
        let w = pixelWidth
        let h = pixelWidth
        for (let i = 0; i < 8; i++) {
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
                // 8 bits per line
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let pixel = ( c2 << 1) + c1
                if (pixel == 0) {
                    continue
                }
                let color = colors[pixel]
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }
        }
    }
    drawSprite() {
        let bytesPerBlock = 16
        let tilesPerSprite = 8
        let bytesPerSprite = bytesPerBlock * tilesPerSprite
        let dataOffset = this.frameIndex * bytesPerSprite
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        let numberOfPixelPerBlock = 8 // 每个图块 8 * 8 像素
        let pixelWidth = this.pixelWidth
        let blockSize = numberOfPixelPerBlock * pixelWidth
        let offset = 0
        for (var i = 0; i < this.columnsOfSprite; i++) {
            for (var j = 0; j < this.rowsOfSprite; j++) {
                let x = j * blockSize
                let y = i * blockSize
                let pixels = data.slice(offset)
                this.drawBlock(context, pixels, x, y, pixelWidth)
                offset += 16
            }
        }
    }
    update() {
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 436
        if (this.y > h) {
            this.y = h
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 4
            this.frameIndex++
            this.frameIndex %= 4
        }
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        // context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        this.drawSprite()
        context.restore()
    }
}
