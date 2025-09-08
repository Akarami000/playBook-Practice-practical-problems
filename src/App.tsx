import './App.css'
import {lazy, Suspense } from 'react'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'

function App() {
const Todo = lazy(()=>import('./Projects/TodoApp/Todo'))
const List = lazy(()=>import('./common/List/List'))
  return (
    <>
     <Router>
     <Routes>
     <Route path='/' element={
       <Suspense fallback="loading...">
      <List/>
      </Suspense>
      }/> 
   
     <Route path='/Todo-App' element={
        <Suspense fallback="loading...">
          <Todo/>
      </Suspense>
      }></Route>
     </Routes>
     </Router>

     
    </>
  )
}

export default App
