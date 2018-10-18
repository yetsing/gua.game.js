class GuaTileMap {
    constructor(game) {
        this.game = game
        this.tiles = [
            1, 1, 1, 1, 1,
            1, 2, 3, 0, 1,
            1, 2, 3, 1, 1,
        ]
        this.th = 5
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            GuaImage.new(game, 'brick'),
            GuaImage.new(game, 'groud'),
            GuaImage.new(game, 'question_mark'),
            GuaImage.new(game, 'grass'),
        ]
        this.tileSize = 48
    }
    static new(game) {
        return new this(game)
    }
    update() {

    }
    draw() {
        for (var i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / this.th) * this.tileSize
                let y = (i % this.th) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
        }
    }
}

class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        // mario
        this.mario = Mario.new(this.game)
        this.map = GuaTileMap.new(this.game)
        this.addElement(this.mario)
        this.addElement(this.map)
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
