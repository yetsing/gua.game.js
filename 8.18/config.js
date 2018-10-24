const control = {
    x: {
        _comment: 'mario_x',
        value: 200,
    },
    y: {
        _comment: 'mario_y',
        value: 436,
    },
    map_speed: {
        _comment: '地图移动速度',
        value: 4,
        step: 2,
        max: 64,
    }
}

const marioConfig = {
    move: {
        frameX: [0, 32, 64],
        frameY: [0, 0, 0],
        frameWidth: 32,
        frameHeight: 64,
    },
    idle: {
        frameX: [0],
        frameY: [0],
        frameWidth: 32,
        frameHeight: 64,
    },
    jump: {
        frameX: [0],
        frameY: [0],
        frameWidth: 32,
        frameHeight: 64,
    },
    turn: {
        frameX: [0],
        frameY: [0],
        frameWidth: 32,
        frameHeight: 64,
    }
}
