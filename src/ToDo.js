import Task from './Task'
import Form from './Form'

export class ToDo {

    constructor(storageKey) {
        this.storageKey = storageKey || 'todo'
        this.container = null

        this.tasks = []

        this.isLoading = true

        this.loadTasks()
    }

    setLoading(newLoading){
        this.isLoading = newLoading
        this.render()
    }

    loadTasks() {
        return fetch('https://mk--sandbox-default-rtdb.firebaseio.com/todo.json')
            .then((response) => response.json())
            .then((data) => {
                this.tasks = data
                this.render()
            })
    }

    setTasks(newTasks) {
        return fetch(
            'https://mk--sandbox-default-rtdb.firebaseio.com/todo.json',
            {
                method: 'PUT',
                body: JSON.stringify(newTasks)
            }
        )
            .then((response) => response.json())
            .then((tasksSavedInDb) => {
                this.tasks = tasksSavedInDb
                this.render()
            })
    }

    deleteTask(indexToDelete) {
        const newTasks = this.tasks.filter((taskData, index) => {
            return index !== indexToDelete
        })
        this.setTasks(newTasks)
    }

    addTask(text) {
        const newTaskData = {
            text: text,
            isComplited: false,
        }

        const newTasks = this.tasks.concat(newTaskData)
        this.setTasks(newTasks)
    }

    toggleComplite(indexToComplite) {
        const newTasks = this.tasks.map((taskData, index) => {
            if (index !== indexToComplite) return taskData
            return {
                text: taskData.text,
                isComplited: !taskData.isComplited
            }
        })
        this.setTasks(newTasks)
    }

    renderTasks() {
        this.tasks.forEach((taskData, index) => {
            const task = new Task(
                taskData,
                () => this.toggleComplite(index),
                () => this.deleteTask(index)
            )
            this.container.appendChild(task.render())
        })

    }

    render() {
        if (this.container === null) {
            this.container = document.createElement('div')
        }

        this.container.innerHTML = ''

        if(this.isLoading){
            const text = document.createTextNode('Loading...')
            this.container.appendChild(text)

            return this.container
        }

        const form = new Form('', (value) => this.addTask(value))

        this.container.appendChild(form.render())


        this.renderTasks()

        return this.container
    }

}

export default ToDo