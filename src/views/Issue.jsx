import React from "react";
import MyForm from "../components/MyForm";
import Nav from "../components/Nav";

const Issue = () => {
    return (
        <div>
            <Nav cmp={"issue"} />
            <div className='flex justify-center mt-10'>
                <MyForm cmp={"issue"} />
            </div>
        </div>
    );
};

export default Issue;
