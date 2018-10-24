const control = {
    width: {
        _comment: '拼图版宽度',
        value: 32,
    },
    height: {
        _comment: '拼图版高度',
        value: 32,
    },
}

var es = sel => document.querySelectorAll(sel)

var insertDebugBox = function() {
    var debugBox = document.querySelector('.gua-control')
    var items = Object.keys(control)
    // log(setting)
    for (var i = 0; i < items.length; i++) {
        var s = items[i]
        var t = `
        <div>
            <label>
                <input class="gua-auto-slider" type="range"
                max="1000"
                step="16"
                value="${control[s].value}"
                data-value="control.${s}"
                >
                ${control[s]._comment}：<span class="gua-label">${control[s].value}</span>
            </label>
        </div>
        `
        debugBox.insertAdjacentHTML('beforeend', t)
    }
}

var updateCanvasSize = () => {
    let canvas = e('#id-canvas-tile')
    canvas.width = control.width.value
    canvas.height = control.height.value
    // setInterval(function() {
    //     let canvas = e('#id-canvas-tile')
    //     if (canvas.width != control.width.value) {
    //         canvas.width = control.width.value
    //     } else if (canvas.height != control.height.value) {
    //         canvas.height = control.height.value
    //     }
    // }, 200)
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

var bindChangeEvents = function() {
    bindAll('.gua-auto-slider', 'input', function(event) {
        var target = event.target
        var bindVar = target.dataset.value
        var v = target.value
        eval(bindVar + '.value =' + v)
        var label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
        updateCanvasSize()
    })
}

var addColorOptions = function() {
    var names = Object.keys(config.color)
    var colorSelect = e('select')
    for (var i = 0; i < names.length; i++) {
        var key = names[i]
        if (key == 'mario') {
            var t = `<option value="mario" selected="selected">mario</option>`
        } else {
            var t = `<option value="${key}">${key}</option>`
        }
        colorSelect.insertAdjacentHTML('afterbegin', t)
    }
}

var enableDebugMode = function(game) {
    insertDebugBox()
    bindChangeEvents()
    addColorOptions()
    // updateCanvasSize()
}

enableDebugMode()
