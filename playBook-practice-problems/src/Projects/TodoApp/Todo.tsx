import { useCallback, useContext, useState } from "react";
import { contextProvider } from "../../ContextAPI/createContext";
import { Input } from "@mui/material";
import './Todo.css'
import {v4 as uuid} from 'uuid'

interface ListDataItem {
  id:string,
  text:string
}
const Todo = () => {
const  {selectMode} = useContext(contextProvider)
 const [input,setInput] = useState("")
 const [listData,setListData]= useState<ListDataItem[]>([])


const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && input.trim()!=="" ) {
        setListData([...listData,{ id:uuid(),text:input}])
        setInput("")
    }
}
const handleOnEdit =useCallback((data:ListDataItem)=>{
    setListData(listData.map((item)=> 
        item.id===data.id ? {...item,text:data.text}:item))
},[listData])
const handleDelete = (data:any)=>{
    setListData(listData.filter((item)=> item.id !== data.id))
}
 return (
        <div className={`Todo-${selectMode}`}>
            <h1>Todo List</h1>
            <Input
            className={`input-box-${selectMode}`}
            style={selectMode==="Dark" ?{
                width:'300px',
                border:"1px solid white",
                color:"white"
            }:{
                 width:'300px',
                border:"1px solid black",
                color:"black"
            }}
            type="text"
            name="Search"
            value={input}
            onChange={(e)=>{setInput(e.target.value)}}
            onKeyDown={handleKeyDown}
            ></Input>

            <div className={`Todo-list${selectMode}`}>
                <TaskBar onEdit={handleOnEdit} sendListData={listData} onDelete={handleDelete} selectMode={selectMode}/>
            </div>
        </div>
    )
};

interface TaskBarProps {
    selectMode: string;
    sendListData:ListDataItem[];
    onDelete:(item:string)=>void;
    onEdit:(item:ListDataItem)=>void;
   
}


const TaskBar = (prop: TaskBarProps) => {
    const [checkbox,setCheckBox] = useState<string[]>([]);
    const [editInput,setEditInput]= useState<ListDataItem>({
        id:"",
        text:""
    })
    const handleCheckBox=(data:any)=>{
        setCheckBox((previousCheckedItem:any)=>{
            if(previousCheckedItem.includes(data)){
                return previousCheckedItem.filter((item:Boolean)=> item !== data)
            }else{
                return [...previousCheckedItem,data]
            }
        })
    }

     
    
    
    const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key=== "Enter" && editInput.text.trim() !== ""){
                prop.onEdit(editInput)

             setEditInput({id:"",text:""})
        }
       
    }
    return (
        <>
      { prop.sendListData.map((data)=>{
        const isChecked =  checkbox.includes(data);
        const edit = editInput.id === data.id;
        return(
             <div key={data.id}  className={`taskBar-${prop.selectMode}`} >
           <div className="checkboxWithText">
            <Input
                
                onChange={()=>handleCheckBox(data)}
                type="checkbox"
                style={{
                    padding:"10px"
                }}
                defaultChecked={isChecked}
            />
            {!edit ?<h3 style={isChecked?{textDecoration: "line-through"}:{textDecoration:"None"}}> {data.text}</h3>:
                <Input
                value={editInput.text}
                style={prop.selectMode==="Dark" ?{
                width:'250px',
                height:'30px',
                border:"1px solid white",
                color:"white"
            }:{
                 width:'250px',
                height:'30px',
                border:"1px solid black",
                color:"black"
            }}
                type="text"
                onChange={(e)=>setEditInput({...editInput,text:e.target.value})}
                 onKeyDown={handleKeyDown}
                />
            }
            </div>
            <div>
            <button className="button" onClick={()=>{setEditInput({id:data.id,text:data.text}) }} style={{margin:"5px"}} >Edit</button>
             <button className="button"  style={{margin:"5px"}} onClick={()=>prop.onDelete(data)} >Delete</button>
            </div>
        </div>
        )
      })}
        </>
    )
}



export default Todo;