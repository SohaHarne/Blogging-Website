import React, { useEffect, useState } from "react";
import myBigData from "./data.json";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Explore from "./pages/explore";
import Search from "./pages/search";
import Create from "./pages/create";
import Account from "./pages/account";
import {BrowserRouter,Routes,Route} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    setUser(myBigData);
  }, []);
  return(
  <BrowserRouter>
  
  <Routes> 
    <Route path ="/" element={<Register/>} /> 
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/search" element={<Search />} />
    <Route path="/create" element={<Create />} />
    <Route path="/account" element={<Account />} />
    <Route path="/explore" element={<Explore />} />
  </Routes> 
  
  
  </BrowserRouter>
  );
};
   
    
    

export default App;