class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = game.debugModeEnabled
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }
    removeDeadElement() {
        var es = []
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            if (!e.dead) {
                es.push(e)
            }
        }
        this.elements = es
    }
    update() {
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        // this.removeDeadElement()
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
