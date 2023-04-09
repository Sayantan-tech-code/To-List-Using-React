import React, { useState , useEffect} from 'react'
import "./style.css"

//get the local storage data back
const getLocalData = () =>{
  const lists = localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }else{
    return[];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const[isEditItem, setIsEditItem] = useState("");
  const[toggleButton, setToggleButton] = useState(false);

  // add the items function
  const addItem = () => {
    if (!inputdata) {
      alert('Please Fill The Data')
    }else if(inputdata && toggleButton){
      setItems(
        items.map((curEle) => {
          if(curEle.id === isEditItem){
            return{...curEle, name:inputdata }
          }
          return curEle;
        })
      )
      setInputData([])
    setIsEditItem(null);
    setToggleButton(false);
    } 
    else {
      const myNewInputData={
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      //etar mane prothom item taw thakbe pase notun add item taw ese jabe
      setItems([...items, myNewInputData]);
      setInputData("");
      setToggleButton(true)
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_to_edited = items.find((curEle) => {
      return curEle.id === index;
    })
    setInputData(item_to_edited.name)
    setIsEditItem(index);
    setToggleButton(true);
  }

  // how to delete items section 
  const deleteItem = (index) =>{
      const updatedItems = items.filter((curEle)=>{
return curEle.id !== index;
      });
      setItems(updatedItems);
  };

  //Remove all the elements
  const removeAll = () =>{
    setItems([]);
  };

  //store data in local storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here✌</figcaption>
          </figure>
          <div className='addItems'>
            <input type="text"
              placeholder='✍ Add Items...' className='form-control'
              value={inputdata}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>}
            
          </div>
          {/* Show our Items  */}
          <div className='showItems'>
            {items.map((curEle) => {
              return (
                <div className='eachItem' key = {curEle.id}>
                  <h3>{curEle.name}</h3>
                  <div className='todo-btn'>
                    <i className="far fa-edit add-btn" onClick={() => editItem(curEle.id)}> </i>
                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curEle.id)}></i>
                  </div>
                </div>

              )
            })
            }


          </div>

          {/* "Remove All" button  */}
          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
            </button></div>
        </div>
      </div>
    </>
  )
}

export default Todo
