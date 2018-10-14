const config = {
    score: {
        cutX: [0, 36, 80, 125, 168, 213, 257, 296, 341, 385],
        cutY: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sWidth: 40,
        sHeight: 57,
        x: 180,
        y: 70,
    }
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
        x: 183,
        y: 230,
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
    },
    score_x: {
        _comment: '当前分数x',
        value: 400,
    },
    score_y: {
        _comment: '当前分数y',
        value: 300,
    },
    best_y: {
        _comment: '最好分数y',
        value: 320,
    },
    medal_x: {
        _comment: '奖牌x坐标',
        value: 200,
    },
    medal_y: {
        _comment: '奖牌y坐标',
        value: 300,
    },
}

bestScore = 0
