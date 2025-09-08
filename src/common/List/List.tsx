import { Switch } from "@mui/material"
import { useContext } from "react"
import { contextProvider } from "../../ContextAPI/createContext"
import { Link } from "react-router-dom"

const List = ()=>{
    const  {selectMode,setSelectMode} = useContext(contextProvider)

const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSelectMode(e.target.checked ? "Dark" : "Light");
}
    return (
         <div className={`main-component-${selectMode}`}>
      <div className={`header-top-${selectMode}`}> 
    <div className={`Toggle-Switch`}>
        {selectMode}<Switch checked={selectMode === "Dark"} onChange={handleSwitch} />
      </div>
      <h1 className={`main-h1`}> List of Project  to choose From </h1>
      </div>
    <ul>
        <li><Link to="/Todo-App">Todo List APP</Link></li>
    </ul>
      <div className={`list-of-project-${selectMode}`}>
        
       
     </div>
      </div>
    )

}

export default List;