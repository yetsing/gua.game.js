class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var ps = GuaParticleSystem.new(game, 150, 200)
        this.addElement(ps)
    }
}
