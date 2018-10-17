class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.speed = randomBetween(2, 5)
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.enemySpeed
    }
}
