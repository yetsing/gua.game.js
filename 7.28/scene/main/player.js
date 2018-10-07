class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.x = 100
        this.y = 150
        this.speed = 10
        this.cooldown = 0
        this.bullets = []
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    debug() {
        this.speed = config.playerSpeed
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fireCooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x - b.w / 2
            b.y = y - b.h
            this.scene.addElement(b)
            this.bullets.push(b)
        }
    }
    moveLeft() {
        // log('move left')
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    removeBullet() {
        var bs = []
        for (var b of this.bullets) {
            if (!b.dead) {
                bs.push(b)
            }
        }
        this.bullets = bs
    }
}
