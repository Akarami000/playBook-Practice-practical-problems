import React, {createContext, useState, type Dispatch} from 'react';

type context = {
    selectMode: string;
    setSelectMode: Dispatch<React.SetStateAction<string>>;
}

export const contextProvider = createContext<context>({
    selectMode: "Dark",
    setSelectMode: () => {},
});//default

export const ProviderWrapper =({children}:{children:React.ReactNode})=>{
const [selectMode,setSelectMode] = useState("Dark")
return(
    <contextProvider.Provider value={{selectMode,setSelectMode}}>
        {children}
    </contextProvider.Provider>
)
}
