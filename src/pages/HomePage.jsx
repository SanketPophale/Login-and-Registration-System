import React from "react";
import UserTable from "../components/UserTable"; 

const HomePage = () => {
    return (
        <div>
            <h1 className="text-center mt-10">Welcome to the Homepage</h1>
            <UserTable /> 
        </div>
    );
};

export default HomePage;
