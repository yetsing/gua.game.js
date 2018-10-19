class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'sky')
        this.player = Player.new(this.game)
        this.numberOfEnemies = 6
        this.cloud = Cloud.new(this.game)
        this.scoreLabel = ScoreLabel.new(this.game)
        this.enemies = []

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        this.addElement(this.scoreLabel)

        this.addEnemies(this.numberOfEnemies)
    }
    addEnemies(numberOfEnemies) {
        for (var i = 0; i < numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            this.enemies.push(e)
            this.addElement(e)
        }
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })
    }
    hit() {
        var bullets = this.player.bullets
        var enemies = this.enemies
        var player = this.player
        for (var b of bullets) {
            for (var e of enemies) {
                if(rectIntersects(e, b)) {
                    e.dead = true
                    b.dead = true
                    this.scoreLabel.score += 20
                }
            }
        }
        for (var e of enemies) {
            if (!player.dead && rectIntersects(e, player)) {
                player.dead = true
                this.addExplosionAnimation(player)
                e.dead = true
            }
        }
        this.removeDeadEnemy()
        this.player.removeBullet()
    }
    removeDeadEnemy() {
        var es = []
        var n = 0
        for (var e of this.enemies) {
            if (e.dead) {
                n += 1
                this.addParticleSystem(e)
            } else {
                es.push(e)
            }
        }
        this.enemies = es
        this.addEnemies(n)
    }
    addParticleSystem(plane) {
        var e = plane
        var x = e.x + e.w / 2
        var y = e.y + e.h /2
        var ps = GuaParticleSystem.new(this.game, x, y)
        this.addElement(ps)
    }
    addExplosionAnimation(plane) {
        var a = GuaAnimation.new(this.game)
        var sWidth = 73
        var sHeight = 72
        var sx = 0
        var sy = 0
        var dx = plane.x
        var dy = plane.y
        a.init(sx, sy, sWidth, sHeight, dx, dy)
        this.addElement(a)
    }
    update() {
        super.update()
        this.cloud.y += 1
        this.hit()
    }
}
