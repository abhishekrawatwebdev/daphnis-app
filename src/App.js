import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Products from './Containers/Products/Products';


function App() {
  const [category,setCategory] = useState("All")

  return (
    <div className="App">
        <Header setCategory={setCategory} defaultValue={category}/>
        <Products category={category}/>
    </div>
  );
}

export default App;
