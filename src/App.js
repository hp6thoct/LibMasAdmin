import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import BookManagement from "./Pages/BookManagement";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./Context/UserContext";
import 'antd/dist/reset.css';
import ReaderManagement from "./Pages/ReaderManagement";
import ReaderBorrow from "./Pages/ReaderBorrow";



function App() {
  return (
    <UserProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/book" element={<BookManagement />}/>
          <Route path="reader" element={<ReaderManagement />}/>
          <Route path="/reader/:readerid/borrow" element={<ReaderBorrow/>}/>
        </Routes>
        
      </div>
    </UserProvider>
  );
}

export default App;
