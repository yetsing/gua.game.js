var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var up = a.y + a.h < b.y
    var bottom = a.y > b.y + b.h
    var left = a.x + a.w < b.x
    var right = a.x > b.x + b.w
    if (up || bottom || left || right) {
        return false
    }
    return true
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
