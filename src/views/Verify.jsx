import React from "react";
import MyForm from "../components/MyForm";
import Nav from "../components/Nav";

const Verify = () => {
    return (
        <div>
            <Nav cmp={"certificates"} />
            <div className='flex justify-center mt-10'>
                <MyForm cmp={"verify"} />
            </div>
        </div>
    );
};

export default Verify;
