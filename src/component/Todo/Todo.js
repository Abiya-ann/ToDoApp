import React, { Component } from 'react' 
import './Todo.css';

export default class Todo extends Component {
  state ={
    input:"",
    items:[],
    completedItems: []
  }
  handleChange =(event)=>{

    this.setState({
      input:event.target.value
    });
 
  };
  
  storeItems =(event)=>{
    event.preventDefault();               //to prevent [age from refreshing
    const {input} =this.state;           
   
if(input.trim()){
    this.setState({
      items:[...this.state.items,input],  //create a copy of items array and push input into that array
      input:""
    })
  }
}
  deleteItem=(key)=>{    //key is index
  
   this.setState({
    items:this.state.items.filter((data,index)=>index!==key)
   })
  }

  editItem=(key)=>{
    const currentItem = this.state.items[key];
   const newValue=prompt("Enter the new item:",this.state.items[key])
   if(newValue !== null){
    const updateItems =[...this.state.items]
    updateItems[key]=newValue;
    this.setState({
      items:updateItems
    })
  }
  }
  toggleComplete = (key) => {
    const completedItem = this.state.items[key];
    const currentDate = new Date();
    this.setState({
      items:this.state.items.filter((_,index)=>index!==key),
      completedItems:[...this.state.completedItems, {
        text: completedItem,
        completedAt: currentDate
      }]
      
    });
    
    setTimeout(()=>{
      this.setState(prevState=>({
        completedItems: prevState.completedItems.filter(
          items =>(new Date() - items.completedAt) < 24*60*60*1000
        )
      }));
    }, 24 * 60 *60 *1000);
  }
  

  render() {
    const{input,items, completedItems}=this.state;
    
    return (
      <div className="todo-container">
      
        <form className="input-section" 
        onSubmit={this.storeItems} >
        <h1>Todo App</h1>
            <input type="text" 
            value={input} 
            onChange={this.handleChange} 
            placeholder="Enter items..."/>
            
        </form>
        <ul>  
     
            {items.map((data,index)=>(
              <li key={index} onClick={()=>this.toggleComplete(index)}>
                {data}
              <i onClick={(e)=>{
                e.stopPropagation();
                this.editItem(index)
              }} className="fa-solid fa-pen-to-square" >

              </i>
              <i onClick={(e)=>{
                e.stopPropagation();
                this.deleteItem(index);
              }} 
                className="fa-solid fa-trash-can"></i>
              </li>

            ))}
            {completedItems.map((item,index) =>(
              <li
              key={`completed-${index}`}
              style={{textDecoration: 'line-through',color:'#888'}}
              >
                {item.text}
              </li>
            ))}

            
        </ul>
      


      </div>
    )
  }
}

