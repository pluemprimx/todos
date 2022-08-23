import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../component/auth/login";
import Todo from "../component/todo/todo";

export const Router = (props) => {

  return (
    <BrowserRouter basename="/">
      <div >
        <Routes>
            <Route exact path="/"
              element={<Login />}
            />
             <Route exact path="/todo"
              element={<Todo />}
            />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router