import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from "./screens/ProductScreen.js";
import ProductDetails from "./screens/ProductDetails.js";
import { useContext } from 'react';
import { Store } from './Store.js';

function App() {
  const {state}=useContext(Store);
  const {cart}=state;
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
      <Link to="/">Allegretto</Link> 
      </header>
      <main>
        <Routes>
          <Route path="/produkt/:klucz" element={<ProductScreen/>}/>
          <Route path="/details/:klucz" element={<ProductDetails />} />
          <Route path="/" element={<HomeScreen />}/>
        </Routes>
        
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
