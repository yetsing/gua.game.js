class GuaTileMap {
    constructor(game) {
        this.game = game
        this.tiles = JSON.parse(guaMapData)
        this.tileSize = 32
        this.offsetX = 0
        this.maxOffsetX = -195 * this.tileSize
        this.start = 0
        this.th = 15
        this.tw = 16 // this.tiles.length / this.th
        this.tileImages = [
            GuaImage.new(game, 'brick'),
            GuaImage.new(game, 'groud'),
            GuaImage.new(game, 'question_mark'),
            GuaImage.new(game, 'cloud1'),
            GuaImage.new(game, 'cloud2'),
            GuaImage.new(game, 'cloud3'),
            GuaImage.new(game, 'grass1'),
            GuaImage.new(game, 'grass2'),
            GuaImage.new(game, 'grass3'),
            GuaImage.new(game, 'mount1'),
            GuaImage.new(game, 'mount2'),
            GuaImage.new(game, 'pipe1'),
            GuaImage.new(game, 'pipe2'),
            GuaImage.new(game, 'pipe3'),
            GuaImage.new(game, 'castle'),
            GuaImage.new(game, 'flagpole'),
            GuaImage.new(game, 'square'),
        ]
        this.speed = 1
    }
    static new(game) {
        return new this(game)
    }
    onTheGround(i, j) {
        let index = i * this.th + j
        let tile = this.tiles[index]
        return tile != 0
    }
    update() {
        // log(this.offsetX, this.maxOffsetX)
        if (this.offsetX <= this.maxOffsetX) {
            return
        }
        this.speed = control.map_speed.value
        this.offsetX -= this.speed
        if (this.offsetX < -10 * this.tileSize && this.offsetX % 64 == 0) {
            this.start += 2 * this.th
            log('start', this.start, this.offsetX)
        }
        if (this.start > 2745) {
            this.start = 2745
        }
    }
    draw() {
        let s = this.start + this.th * this.tw * 2
        // log('draw part', this.start, s)
        for (var i = this.start; i < s; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / this.th) * this.tileSize
                x += this.offsetX
                let y = (i % this.th) * this.tileSize
                let image = this.tileImages[index - 1]
                this.game.context.drawImage(image.texture, x, y)
                // log('draw tile')
            }
        }
    }
}
