
import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import MainPage from './MainPage';
import Login from './Login';
import Register from './Register'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<Login />}/>
                <Route path={'/register'} element={<Register />}/>
                <Route path={'/'} element={<MainPage />}/>
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
