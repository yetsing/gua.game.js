var es = sel => document.querySelectorAll(sel)

var fpsControl = function() {
    var debugBox = document.querySelector('#id-debug-box')
    var t = `
        <div>
            <label>
                <input id="id-input-speed" type="range" value="${window.fps}">
                FPS：<span class="gua-label">${window.fps}</span>
            </label>
        </div>
    `
    debugBox.insertAdjacentHTML('beforeend', t)
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
        var fpsLabel = document.querySelector('span')
        fpsLabel.innerText = window.fps
    })
}

var insertDebugBox = function() {
    var debugBox = document.querySelector('#id-debug-box')
    var items = Object.keys(config)
    // log(setting)
    for (var i = 0; i < items.length; i++) {
        var s = items[i]
        var t = `
        <div>
            <label>
                <input class="gua-auto-slider" type="range"
                max="${config[s].value}"
                value="${config[s].value}"
                data-value="config.${s}"
                >
                ${config[s]._comment}：<span class="gua-label">${config[s].value}</span>
            </label>
        </div>
        `
        debugBox.insertAdjacentHTML('beforeend', t)
    }
}

var bindAll = function(sel, eventName, callback) {
    var l = es(sel)
    for (var i = 0; i < l.length; i++) {
        var input = l[i]
        input.addEventListener(eventName, function(event) {
            callback(event)
        })
    }
}

var bindEvents = function() {
    bindAll('.gua-auto-slider', 'input', function(event) {
        var target = event.target
        var bindVar = target.dataset.value
        var v = target.value
        log('bindvar', bindVar)
        eval(bindVar + '.value =' + v)
        var label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}

var enableDebugMode = function(game) {
    game.debugModeEnabled = true
    window.paused = false
    // 控制帧率
    fpsControl()
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })

    insertDebugBox()
    bindEvents()
}
