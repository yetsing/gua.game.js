class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.speed = 1
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloudSpeed
    }
}
