import { useContext, useState } from "react";
import { contextProvider } from "../../ContextAPI/createContext";
import { Input } from "@mui/material";
import './Todo.css'
import {v4 as uuid} from 'uuid'


const Todo = () => {
const  {selectMode} = useContext(contextProvider)
 const [input,setInput] = useState("")
 const [listData,setListData]= useState<string[]>([])
interface ListDataItem {
    // Define the structure of your list items here if known
    // For example: id: number; text: string;
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
        setListData([...listData,input])
        setInput("")
    }
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
                <TaskBar sendListData={listData} selectMode={selectMode}/>
            </div>
        </div>
    )
};

interface TaskBarProps {
    selectMode: string;
    sendListData:string[];
   
}
interface ShareData{
    shareData:boolean
}

const TaskBar = (prop: TaskBarProps) => {
    const handleCheckBox=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.checked)
    }
    return (
        <>
      { prop.sendListData.map((data)=>{
        return(
             <div key={uuid()}  className={`taskBar-${prop.selectMode}`}  >
           <div className="checkboxWithText">
            <Input
                
                onChange={handleCheckBox}
                type="checkbox"
                style={{
                    padding:"10px"
                }}
            />
            <h3 style={{textDecoration: "line-through"}}> {data}</h3>
            </div>
            <div>
            <button className="button" style={{margin:"5px"}} >Edit</button>
             <button className="button" style={{margin:"5px"}} >Delete</button>
            </div>
        </div>
        )
      })}
        </>
    )
}



export default Todo;