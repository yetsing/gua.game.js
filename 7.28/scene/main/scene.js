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

        // this.addElement(this.bg)
        // this.addElement(this.cloud)
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
        for (var b of bullets) {
            for (var e of enemies) {
                if(rectIntersects(e, b)) {
                    log('hit succcess')
                    e.dead = true
                    b.dead = true
                    this.scoreLabel.score += 20
                }
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
                var x = e.x + e.w / 2
                var y = e.y + e.h /2
                var ps = GuaParticleSystem.new(this.game, x, y)
                this.addElement(ps)
            } else {
                es.push(e)
            }
        }
        this.enemies = es
        this.addEnemies(n)
    }
    update() {
        super.update()
        this.cloud.y += 1
        this.hit()
    }
}
