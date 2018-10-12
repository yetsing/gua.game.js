const config = {
    playerSpeed: 10,
    cloudSpeed: 1,
    enemySpeed: 5,
    bulletSpeed: 5,
    fireCooldown: 10,
    particleSpeed: 5,
}

const configName = {
    playerSpeed: '玩家速度',
    cloudSpeed: '云朵速度',
    enemySpeed: '敌机速度',
    bulletSpeed: '子弹速度',
    fireCooldown: '子弹冷却时间',
    particleSpeed: '粒子初速',
}

const animationConfig = {
    bird: {
        x: 100,
        y: 200,
        width: 34,
        height: 24,
        moveDirection: 'y',
    }
}

const pipeConfig = {
    pipe_space: {
        _comment: '2 根管子垂直间距',
        value: 150,
    },
    pipe_distance: {
        _comment: '2 根管子水平间距',
        value: 200,
    }
}
