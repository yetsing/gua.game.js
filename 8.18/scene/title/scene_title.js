class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'bg')
        this.ground = Ground.new(this.game)
        this.addElement(this.bg)
        this.addElement(this.ground)
        // mario
        let mario = GuaNesSprite.new(this.game)
        this.addElement(mario)
        mario.x = 200
        mario.y = 436
        this.mario = mario
    }
    setupInputs() {
        var g = this.game
        var m = this.mario
        g.registerAction('a', function(){
            m.moveLeft()
        })
        g.registerAction('d', function(){
            m.moveRight()
        })
        g.registerAction('w', function(){
            m.jump()
        })
    }
}
