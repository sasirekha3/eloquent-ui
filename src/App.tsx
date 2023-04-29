
import './App.css';
import MyNavbar from './MyNavbar';
import { Routes, Route } from "react-router-dom";
import Home from './view/Home';
import CategoryList from './view/CategoryList';
import WordList from './view/WordList';
import LogIn from './view/LogIn';
import Play from './view/Play';
import Word from './view/Word';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/play' element={<Play />} />
        <Route path='/categories' element={<CategoryList />} />
        <Route path='/words' element={<WordList />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/word' element={<Word />} />
      </Routes>
    </div>
  );
}

export default App;
