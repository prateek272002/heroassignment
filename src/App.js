
import './App.css';
import Add from './screens/Add';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';

function App() {
  return (
    <>
     <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Add />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup/>} />
          </Routes>
        </div>
      </Router>
    </>
    
    
  );
}

export default App;
