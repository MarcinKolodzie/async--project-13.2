import Button from './Button'

export class Task {
    constructor(task, onComplite, onDelete) {
        this.task = task
        this.onComplite = onComplite
        this.onDelete = onDelete
    }

    render() {
        const container = document.createElement('div')
        const p = document.createElement('p')
        // const compilteButton = new Button('Complite', this.onComplite)
        const deleteButton = new Button('Delete', this.onDelete)

        p.innerText = this.task.text


        container.style.display = 'flex'
        container.style.justifyContent = 'space-between'
        container.style.padding = '4px'
        container.style.marginBottom = '4px'
        container.style.borderRadius = '4px'
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'

        if (this.task.isComplited === true) {
            p.style.textDecoration = 'line-through'
        }
        p.style.margin = '4px'
        p.style.width = '100%'
        p.style.fontFamily = 'sans-serif'
        p.style.fontSize = '16px'

        p.addEventListener(
            'click',
            () => this.onComplite()
        )

        container.appendChild(p)
        // container.appendChild(compilteButton.render())
        container.appendChild(deleteButton.render())


        return container
    }

}

export default Task