const actions = {
    change_active_tile(event) {
        let name = event.target.dataset.name
        log(name)
    },
}

const bindActions = () => {
    e('body').addEventListener('click', event => {
        let action = event.target.dataset.action
        actions[action] && actions[action](event)
    })
}

bindActions()
