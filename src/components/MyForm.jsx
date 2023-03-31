import React, { useState, useRef } from "react";
import Papa from "papaparse";
import certificate from "../assets/certificate_form.png";
import { PDFDocument } from "pdf-lib";

const MyForm = ({ cmp }) => {
    const [organization, setOrganization] = useState("");
    const [event, setEvent] = useState("");
    const [CSVName, setCSVName] = useState("");
    const [certificateName, setCertificateName] = useState("");
    const [csvData, setCSVData] = useState({});
    const [pdfData, setPDFData] = useState([]);
    const csvInput = useRef();
    const certificateInput = useRef();

    const handleCSVInput = (e) => {
        e.preventDefault();
        csvInput.current.click();
    };

    const handleCSVChange = (event) => {
        const csvFile = event.target.files[0];
        console.log(csvFile);
        setCSVName(csvFile.name);

        // Parse CSV File
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results.data);

                setCSVData(results.data);
            },
        });
    };

    const handleCertificateInput = (e) => {
        e.preventDefault();
        certificateInput.current.click();
    };

    const handleCertificateChange = (event) => {
        const certificate = event.target.files[0];
        console.log(certificate);

        const reader = new FileReader();
        reader.readAsDataURL(certificate); // Read Certificate
        reader.onloadend = function () {
            // console.log(reader.result);
            PDFDocument.load(reader.result).then(async (pdfDoc) => {
                const pages = pdfDoc.getPages(); // get pages in certificate
                console.log(pages);

                const myPDF = [];
                for (var i = 0; i < pages.length; i++) {
                    const pdfDoc1 = await PDFDocument.create(); // initilize new pdf
                    var copied = await pdfDoc1.copyPages(pdfDoc, [i]); // copy ith page
                    const [data] = copied;
                    pdfDoc1.addPage(data); // add page to new pdf
                    const pdfBytes = await pdfDoc1.save(); // save new pdf
                    myPDF.push(pdfBytes.toString()); // store bytes to pdf
                }
                console.log(myPDF);
                setPDFData(myPDF);
            });
        };

        setCertificateName(certificate.name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // call backend api here and pass data of csv from csvData StateVariable
        console.log(csvData);
        console.log(pdfData);
    };
    return (
        <div className='flex items-center rounded-l-lg w-3/4 bg-[#ECECEC]'>
            <div className='flex justify-center w-1/2 items-center'>
                <img
                    className='rotate-12 bg-contain select-none'
                    src={certificate}
                    alt=''
                />
            </div>
            <div className='bg-white rounded-r-lg w-1/2'>
                <form action='' className='p-5'>
                    <h1 className='text-2xl font-bold text-center'>
                        Enter your details
                    </h1>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor='organization_name'>
                            Organization Name
                        </label>
                        <input
                            className='p-2 bg-gray-100 rounded-lg outline-my-purple mt-1'
                            type='text'
                            onChange={(e) => setOrganization(e.target.value)}
                            value={organization}
                            name='organization_name'
                            id='organization_name'
                            placeholder='Organization Name'
                        />
                    </div>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor='event_name'>Event Name</label>
                        <input
                            className='p-2 bg-gray-100 rounded-lg outline-my-purple mt-1'
                            type='text'
                            onChange={(e) => {
                                setEvent(e.target.value);
                            }}
                            value={event}
                            name='event_name'
                            id='event_name'
                            placeholder='Event Name'
                        />
                    </div>
                    {cmp === "issue" && (
                        <div className='flex flex-col mt-5'>
                            <label htmlFor='event_name'>
                                Participants Details
                            </label>
                            <input
                                className='hidden'
                                type='file'
                                id='csvFile'
                                accept='.csv'
                                onChange={(e) => handleCSVChange(e)}
                                ref={csvInput}
                            />
                            <div className='flex'>
                                <button
                                    className='bg-gray-300 p-2 w-32 rounded-l-lg'
                                    onClick={(e) => handleCSVInput(e)}>
                                    Choose file
                                </button>
                                <span className='rounded-r-lg w-full p-3 bg-gray-100 overflow-x-hidden'>
                                    {CSVName === ""
                                        ? "Upload CSV File"
                                        : CSVName}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className='flex flex-col mt-5'>
                        <label htmlFor='event_name'>Certificates</label>
                        <input
                            className='hidden'
                            type='file'
                            id='certificateFile'
                            onChange={(e) => handleCertificateChange(e)}
                            ref={certificateInput}
                            accept='.pdf'
                        />
                        <div className='flex'>
                            <button
                                className='bg-gray-300 p-2 w-32 rounded-l-lg'
                                onClick={(e) => handleCertificateInput(e)}>
                                Choose file
                            </button>
                            <span className='rounded-r-lg w-full bg-gray-100 p-3 overflow-x-hidden'>
                                {certificateName === ""
                                    ? "Upload certificates in merged PDF"
                                    : certificateName}
                            </span>
                        </div>
                        <p className='text-xs text-center mt-2'>
                            Don't have certificates?{" "}
                            <a href='#' className='text-my-blue underline'>
                                Create from our template
                            </a>
                        </p>
                    </div>

                    <div className='text-center'>
                        <button
                            className='bg-[#6361AC] p-2 w-32 rounded-lg text-white mt-5'
                            onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyForm;
