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
    var colors = config.color[window.thing]
    let w = pixelWidth
    let h = pixelWidth
    for (let i = 0; i < 8; i++) {
        let p1 = data[i]
        let p2 = data[i + 8]
        for (let j = 0; j < 8; j++) {
            // 8 bits per line
            let c1 = (p1 >> (7 - j)) & 0b00000001
            let c2 = (p2 >> (7 - j)) & 0b00000001
            let pixel = (c2 << 1) + c1
            if (pixel == 0) {
                continue
            }
            let color = colors[pixel]
            context.fillStyle = color
            var px = x + j * w
            var py = y + i * h
            if (window.flipX) {
                px = x + (7 - j) * w
            }
            if (window.flipY) {
                py = y + (7 - i) * h
            }
            // log('flipX', px, py)
            context.fillRect(px, py, w, h)
        }
    }
}

const drawSprite = (data, canvas, offsetX, offsetY, w, h, pixelWidth) => {
    let context = canvas.getContext('2d')
    let numberOfPixelPerBlock = 8 // 每个图块 8 * 8 像素
    let pw = pixelWidth || 10
    let blockSize = numberOfPixelPerBlock * pw
    let offset = 0
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
            let x = (offsetX + j) * blockSize
            let y = (offsetY + i) * blockSize
            let pixels = data.slice(offset)
            drawBlock(context, pixels, x, y, pw)
            offset += 16
        }
    }
}

const drawNes = bytes => {
    // 78 69
    // 0100 1110  0100 0101
    let canvas = e('#id-canvas')
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, 1000, 1000)

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
    change_offset(event) {
        let offset = Number(event.target.dataset.offset)
        window.offset += offset
        e('h3').innerHTML = window.offset
        drawNes(window.bytes)
    },
    draw_tile(event) {
        let target = event.target
        let type = target.dataset.type
        let rect = target.getBoundingClientRect()
        let x = event.clientX - rect.left
        let y = event.clientY - rect.top
        let pixelWidthConfig = {
            source: 10,
            tile: 2,
        }
        let i = Math.floor(x / 8 / pixelWidthConfig[type])
        let j = Math.floor(y / 8 / pixelWidthConfig[type])
        let sizePerBlock = 16
        if (type == 'source') {
            let offset = i * sizePerBlock + j * 8 * sizePerBlock
            window.tileOffset = window.offset + offset
        } else if (type == 'tile') {
            let data = window.bytes.slice(window.tileOffset)
            drawSprite(data, target, i, j, 1, 1, 2)
        }
    },
    clear_canvas(event) {
        let context = e('#id-canvas-tile').getContext('2d')
        context.clearRect(0, 0, 1000, 1000)
    },
    flip(event) {
        let checkbox = event.target
        log('checkbox', checkbox.checked, checkbox.name)
        window[checkbox.name] = checkbox.checked
    },
}

const bindEvents = () => {
    e('body').addEventListener('click', event => {
        let action = event.target.dataset.action
        actions[action] & actions[action](event)
    })
    e('select').addEventListener('input', event => {
        let thing = event.target.value
        log('thing', thing)
        window.thing = thing
    })
}

const __main = () => {
    window.offset = 32784
    window.thing = 'mario'
    let tileOffset = 32784
    let requset = {
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log('bytes', window.bytes)
            drawNes(window.bytes)
        },
    }
    ajax(requset)

    bindEvents()
}

__main()
