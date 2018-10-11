class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var ps = GuaParticleSystem.new(game, 150, 200)
        var a = GuaAnimation.new(game)
        a.init(0, 0, 73, 72, 0, 0)
        this.addElement(ps)
        this.addElement(a)
    }
}
