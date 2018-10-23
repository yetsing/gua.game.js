class Ground {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.skipCount = 5
        this.grounds = []
        for (var i = 0; i < 22; i++) {
            var g = GuaImage.new(this.game, 'ground')
            g.x = i * 20
            g.y = 500
            this.grounds.push(g)
        }
    }
    update() {
        // if (this.game.end) {
        //     return
        // }
        // this.skipCount--
        // var offset = 5
        // if (this.skipCount == 0) {
        //     this.skipCount = 5
        //     offset = -20
        // }
        // for (var i = 0; i < 22; i++) {
        //     var g = this.grounds[i]
        //     g.x -= offset
        // }
    }
    draw() {
        for (var i = 0; i < 22; i++) {
            var g = this.grounds[i]
            g.draw()
        }
    }
}
