import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/home';
import InventoryDetails from './pages/inventorydetails/inventorydetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inventory" element={<InventoryDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
