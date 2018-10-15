let e = sel => document.querySelector(sel)
let log = console.log.bind(console)

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}

const drawBlock = (context, data, x, y, pixelWidth) => {
    const colors = [
        'rgba(255, 255, 255, 1)',
        'rgba(224, 80, 0, 1)',
        'rgba(255, 160, 0, 1)',
        'rgba(136, 138, 0, 1)',
    ]
    let w = pixelWidth
    let h = pixelWidth
    for (let i = 0; i < 8; i++) {
        let p1 = data[i]
        let p2 = data[i + 8]
        for (let j = 0; j < 8; j++) {
            // 8 bits per line
            let c1 = (p1 >> (7 - j)) & 0b00000001
            let c2 = (p2 >> (7 - j)) & 0b00000001
            let pixel = ( c2 << 1) + c1
            let color = colors[pixel]
            context.fillStyle = color
            let px = x + j * w
            let py = y + i * h
            context.fillRect(px, py, w, h)
        }
    }
}

const drawSprite = data => {
    let context = e('#id-canvas-sprite').getContext('2d')
    let numberOfPixelPerBlock = 8 // 每个图块 8 * 8 像素
    let pixelWidth = 10
    let blockSize = numberOfPixelPerBlock * pixelWidth
    let offset = 0
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            let x = j * blockSize
            let y = i * blockSize
            let pixels = data.slice(offset)
            drawBlock(context, pixels, x, y, pixelWidth)
            offset += 16
        }
    }
}

const drawNes = bytes => {
    // 78 69
    // 0100 1110  0100 0101
    let canvas = e('#id-canvas')
    let context = canvas.getContext('2d')

    let numberOfBlock = 8 // canvas 画 8 * 8 个图块
    let numberOfPixelPerBlock = 8 // 每个图块 8 * 8 像素
    let pixelWidth = 10
    let numberOfBytesPerBlock = 16
    // let index =
    for (let i = 0; i < numberOfBlock; i++) {
        for (let j = 0; j < numberOfBlock; j++) {
            let x = j * numberOfPixelPerBlock * pixelWidth
            let y = i * numberOfPixelPerBlock * pixelWidth
            let index = window.offset + (i * 8 + j) * numberOfBytesPerBlock
            drawBlock(context, bytes.slice(index), x, y, pixelWidth)
        }
    }
}

const actions = {
    change_offset(offset) {
            window.offset += offset
            e('h3').innerHTML = window.offset
            drawNes(window.bytes)
    },
}

const bindEvents = () => {
    e('.gua-control').addEventListener('click', event => {
        let action = event.target.dataset.action
        let offset = Number(event.target.dataset.offset)
        actions[action] & actions[action](offset)
    })
}

const __main = () => {
    window.offset = 32784
    let tileOffset = 32784
    let requset = {
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log('bytes', window.bytes)
            drawNes(window.bytes)
            let step = 0
            let bytesPerBlock = 16
            let tilesPerSprite = 8
            let bytesPerSprite = bytesPerBlock * tilesPerSprite
            setInterval(function() {
                let offset = tileOffset + step * bytesPerSprite
                drawSprite(bytes.slice(offset))
                step++
                step %= 4
            }, 200)
        },
    }
    ajax(requset)

    bindEvents()
}

__main()
