export class Loader {
    constructor(message) {
        this.message = message || 'Loading...'
    }


    render() {

        const div = document.createElement('div')

        div.style.width = '100%'
        div.style.height = '100%'
        div.style.position = 'absolute'
        div.style.left = 0
        div.style.right = 0
        div.style.display = 'flex'
        div.style.justifyContent = 'center'
        div.style.alignItems = 'center'
        div.style.zIndex = 1
        div.style.fontFamily = 'sans-serif'
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.8 '

        div.innerText = this.message

        return div

    }
}

export default Loader