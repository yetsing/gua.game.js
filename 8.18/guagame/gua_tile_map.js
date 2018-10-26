class GuaTileMap {
    constructor(game) {
        this.game = game
        this.tiles = JSON.parse(guaMapData)
        this.tileSize = 32
        this.offsetX = 0
        this.previousOffsetX = -10 * this.tileSize
        this.maxOffsetX = -195 * this.tileSize + 10
        this.start = 0
        this.th = 15
        this.tw = 16 // this.tiles.length / this.th
        this.tileImages = [
            GuaImage.new(game, 'brick'),
            GuaImage.new(game, 'ground'),
            GuaImage.new(game, 'question_mark'),
            GuaImage.new(game, 'square'),
            GuaImage.new(game, 'cloud1'),
            GuaImage.new(game, 'cloud2'),
            GuaImage.new(game, 'cloud3'),
            GuaImage.new(game, 'cloud4'),
            GuaImage.new(game, 'grass1'),
            GuaImage.new(game, 'grass2'),
            GuaImage.new(game, 'grass3'),
            GuaImage.new(game, 'mount1'),
            GuaImage.new(game, 'mount2'),
            GuaImage.new(game, 'mount3'),
            GuaImage.new(game, 'mount4'),
            GuaImage.new(game, 'mount5'),
            GuaImage.new(game, 'mount6'),
            GuaImage.new(game, 'pipe1'),
            GuaImage.new(game, 'pipe2'),
            GuaImage.new(game, 'pipe3'),
            GuaImage.new(game, 'pipe4'),
            GuaImage.new(game, 'castle1'),
            GuaImage.new(game, 'castle2'),
            GuaImage.new(game, 'castle3'),
            GuaImage.new(game, 'castle4'),
            GuaImage.new(game, 'castle5'),
            GuaImage.new(game, 'castle6'),
            GuaImage.new(game, 'castle7'),
            GuaImage.new(game, 'flagpole1'),
            GuaImage.new(game, 'flagpole2'),
        ]
        this.speed = 0
        this.correctCount = 0
    }
    static new(game) {
        return new this(game)
    }
    // hitObstacle(i, j) {
    //     let index = i * this.th + j
    //     let tile = this.tiles[index]
    //     let obstacle = [1, 2, 3, 4, 18, 19]
    //     // log('on the ground', tile, tile in ground)
    //     return obstacle.includes(tile)
    // }
    hitObstacle(i, j) {
        let index = i * this.th + j
        let tile = this.tiles[index]
        let obstacle = [1, 2, 3, 4, 18, 19, 20, 21]
        return obstacle.includes(tile) && j >= 0
    }
    update() {
        // log('map move speed', this.speed)
        if (this.offsetX <= this.maxOffsetX) {
            return
        }
        // this.speed = control.map_speed.value
        this.offsetX -= this.speed
        let moveDistance = this.previousOffsetX - this.offsetX
        // log('map speed', this.speed)
        // log('map move distance', moveDistance)
        if (this.offsetX < -10 * this.tileSize && moveDistance > 64) {
            this.start += 2 * this.th
            this.previousOffsetX = this.offsetX
            this.correctCount++
            if (this.correctCount == 5) {
                this.start += this.th
                this.correctCount = 0
            }
            this.start = Math.min(this.start, 2745)
            // log('start', this.start, this.offsetX)
        }
        // if (this.start > 2745) {
        //     this.start = 2745
        // }
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
