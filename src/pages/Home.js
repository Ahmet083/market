import React from "react";
import Header from "../component/header";
import ListBooks from "../component/ListBooks";
import EditBook from "./EditBook";


const Home = (props) => {
    return (
        <div>
        <Header />   
         
        <ListBooks />
       </div>
    )
}
export default Home
