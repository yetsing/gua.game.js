class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 25
        this.dead = false
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.1
        this.vx -= factor * this.vx
        this.vy -= factor * this.vy - 0.1
    }
}

class GuaParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.setup(x, y)
    }
    static new(game, x, y) {
        var i = new this(game, x, y)
        return i
    }
    setup(x, y) {
        this.duration = 20
        this.x = x
        this.y = y
        this.v = config.particleSpeed
        this.degree = 0
        this.numberOfParticles = 75
        this.particles = []
    }
    draw() {
        for (var p of this.particles) {
            p.draw()
        }
    }
    update() {
        this.duration--
        if (this.particles.length < this.numberOfParticles) {
            for (var i = 0; i < 15; i++) {
                var p = GuaParticle.new(this.game)
                var d = this.degree
                var vx = this.v * Math.sin(d * Math.PI / 180)
                var vy = this.v * Math.cos(d * Math.PI / 180)
                p.init(this.x, this.y, vx, vy)
                this.particles.push(p)
                this.degree += 360 / (this.numberOfParticles / 5)
            }
            this.v -= 1
        }
        for (var p of this.particles) {
            p.update()
        }
        this.particles = this.particles.filter(p => p.life > 0)
        this.judge()
    }
    judge() {
        if (this.duration < 0) {
            this.dead = true
        } else {
            this.dead = false
        }
    }
}
