import React from "react";
import { Link } from "react-router-dom";

import Nav from "../components/Nav";
import homeLight from "../assets/homepage light.gif";
import trophy from "../assets/homepage trophy light.png";
import issue from "../assets/issue blue.png";
import verify from "../assets/verify blue.png";
import retrieve from "../assets/retrieve blue.png";
import grid from "../assets/grid.png";
const Home = () => {
    return (
        <div className='w-full '>
            <Nav cmp={"home"} />
            <div className={`bg-[url(${grid})] h-[100vh]`}>
                <div className='flex justify-evenly items-center'>
                    <div className='text-center'>
                        <img
                            className='h-[550px] w-[550px] select-none'
                            src={homeLight}
                            alt=''
                        />
                    </div>

                    <img
                        className='h-[450px] w-[450px] select-none'
                        src={trophy}
                        alt=''
                    />
                </div>
            </div>

            <div className='bg-my-blue my-10 h-[100vh]' id='services'>
                <div className='flex flex-wrap justify-evenly h-96 items-center'>
                    <Link to={"/issue-certificate"}>
                        <img
                            className='h-80 w-80 hover:scale-105 hover:rotate-12 hover:cursor-pointer ease-in duration-150 rounded-full'
                            src={issue}
                            alt=''
                        />
                    </Link>
                    <Link to={"/verify-certificate"}>
                        <img
                            className='h-80 w-80 hover:scale-105 hover:rotate-12 hover:cursor-pointer ease-in duration-150 rounded-full'
                            src={verify}
                            alt=''
                        />
                    </Link>
                    <Link to={"/retrieve-certificate"}>
                        <img
                            className='h-80 w-80 hover:scale-105 hover:rotate-12 hover:cursor-pointer ease-in duration-150 rounded-full'
                            src={retrieve}
                            alt=''
                        />
                    </Link>
                </div>
                <hr className='w-5/6 mx-auto border-my-bg' />
                <div className='h-[33vh] w-full text-center text-my-bg'>
                    <h1 className='text-5xl tracking-wide mb-5  mt-10 font-[900]'>
                        Integrate With Your Software
                    </h1>
                    <p className='text-2xl w-3/4 m-auto'>
                        Now you can easily integrate our solution with any
                        existing software using our API.
                    </p>
                    <button className='button api mt-5' role='button'>
                        Explore API!!!
                    </button>
                </div>
            </div>
            <div className='flex flex-col items-center mt-5'>
                <div className='h-[33vh] w-full text-center'>
                    <h1 className='text-5xl tracking-wide mb-5 mt-10 font-[1000]'>
                        Create Your Certificate
                    </h1>
                    <p className='text-2xl w-3/4 m-auto'>
                        We gives you editable template to create your
                        certificate as you want. We also accept your
                        certificates in single PDF file.
                    </p>
                </div>
                <div className='h-[33vh] w-full text-center'>
                    <h1 className='text-5xl tracking-wide mb-5  mt-10 font-[1000]'>
                        Handle Multiple Certificates
                    </h1>
                    <p className='text-2xl w-3/4 m-auto'>
                        Now you can generate and verify multiple certificates
                        and email generated to corresponding people
                        automatically in just a single click.
                    </p>
                </div>
                <div className='h-[33vh] w-full text-center'>
                    <h1 className='text-5xl tracking-wide mb-5  mt-10 font-[1000]'>
                        Retrieve Certificate
                    </h1>
                    <p className='text-2xl w-3/4 m-auto'>
                        Are you worried about your certificate that it may get
                        lost?? <br /> But now don't worry about that. You can
                        retrieve your old certificate at any point of time in
                        just few seconds.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
