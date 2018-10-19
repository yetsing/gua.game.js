class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        // mario
        this.map = GuaTileMap.new(this.game)
        this.mario = Mario.new(this.game, this.map)
        this.addElement(this.map)
        this.addElement(this.mario)
    }
    setupInputs() {
        var g = this.game
        var m = this.mario
        g.registerAction('a', function(keyStatus){
            m.moveLeft(keyStatus)
        })
        g.registerAction('d', function(keyStatus){
            m.moveRight(keyStatus)
        })
        g.registerAction('w', function(keyStatus){
            m.jump(keyStatus)
        })
    }
}
