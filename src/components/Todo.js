import React from 'react'
import TodoItem from './TodoItem'

class Todo extends React.Component{
    state = {
        elements:[
            {id:'333333', isCompleted:true, title: 'Lebensmittel machen'},
            {id:'333334', isCompleted:false, title: 'Das Auto Fahren'}
        ],
        inputValue: ''
    }

    markCompleted(id){
        const index = this.state.elements
        .findIndex(x => x.id === id)
        const newElements = this.state.elements
        newElements[index].isCompleted = true

        this.setState({elements:newElements})

    }

    addItem(){
//dodawanie
        const item ={
            id:Math.random(),
            title:this.state.inputValue
        }
        const newElements = [item,...this.state.elements]
        this.setState({elements:newElements})
        this.setState({inputValue:''})
    }

    inputhandler(event){
        const newValue = event.target.value
        this.setState({inputValue: newValue})
        }

    render() {
        const elements = this.state.elements.map(e => {
            return <TodoItem element={e} markClicked={this.markCompleted.bind(this)}/>
        })

        return(
            <div>
                Todo app
                <input type ="text" value={this.state.inputValue} onChange ={this.inputhandler.bind(this)}/>
                <button onClick={this.addItem.bind(this)}>der Liste Hinzufügen </button>
                {elements}
            </div>
        )
    }
}

export default Todo