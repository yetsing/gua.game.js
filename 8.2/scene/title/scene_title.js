class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'bg')
        this.ground = Ground.new(this.game)
        this.bird = Bird.new(this.game)
        this.addElement(this.bg)
        this.addElement(this.ground)
        this.addElement(this.bird)
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.bird.moveLeft()
        })
        g.registerAction('d', function(){
            s.bird.moveRight()
        })
        g.registerAction('w', function(){
            s.bird.jump()
        })
    }
}
