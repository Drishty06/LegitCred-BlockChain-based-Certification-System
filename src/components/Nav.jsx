import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ cmp }) => {
    return (
        <div className='flex justify-center h-12 items-center text-lg font-semibold'>
            <Link
                to={"/"}
                className={`mx-8 hover:text-[#2104ae] hover:cursor-pointer ${
                    cmp === "home" ? "underline" : ""
                }`}>
                Home
            </Link>
            <Link
                to={"/issue-certificate"}
                className={`mx-8 hover:text-[#2104ae] hover:cursor-pointer ${
                    cmp === "issue" ? "underline" : ""
                }`}>
                Issue Certificate
            </Link>
            <Link
                to={"/certificates"}
                className={`mx-8 hover:text-[#2104ae] hover:cursor-pointer ${
                    cmp === "certificates" ? "underline" : ""
                }`}>
                Certificates
            </Link>
            {/* <Link
                to={"/retrieve-certificate"}
                className={`mx-8 hover:text-[#2104ae] hover:cursor-pointer ${
                    cmp === "retrieve" ? "underline" : ""
                }`}>
                Retrieve Certificate
            </Link> */}
        </div>
    );
};

export default Nav;
