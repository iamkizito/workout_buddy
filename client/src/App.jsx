import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="pages">          
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth/signin' element={<SignIn/>}/>
            <Route path='/auth/signup' element={<SignUp/>}/>
          </Routes>   
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
