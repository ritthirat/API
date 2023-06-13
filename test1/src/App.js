
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Register from './Register';
import Home from './Home';

function App() {

  return (
    <div className="App">
  
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Routes>
         <Route path='/home' element={<Home/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

      </Routes>
      
      </BrowserRouter>
      
   
    </div>
  );
}

export default App;
