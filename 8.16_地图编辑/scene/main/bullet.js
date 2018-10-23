class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = 2
    }
    update() {
        this.y -= this.speed
        if (this.y < -100) {
            this.dead = true
        }
    }
    debug() {
        this.speed = config.bulletSpeed
    }
}
