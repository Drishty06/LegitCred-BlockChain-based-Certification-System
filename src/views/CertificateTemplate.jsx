import React, { useState, useRef, useCallback, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import EditableText from "../components/Editable_text";
import Nav from "../components/Nav";

import logo from "../assets/logo-certificate.png";
import line from "../assets/353-3531060_decorative-lines-png-transparent-images-clock-png-download-removebg-preview.png";
const ResponsiveGridLayout = WidthProvider(Responsive);

const CertificateTemplate = () => {
    const printRef = useRef();
    const [name, setName] = useState("Your Name");
    const [event, setEvent] = useState("Machine Learning");
    const [heading, setHeading] = useState("certificate of completion");
    const [date, setDate] = useState("31st March 2023");
    const [subheading, setSubheading] = useState(
        "This certificate is awarded for successfully completing a course of Machine Learning on 31st March 2023."
    );
    const [signature1, setSignature1] = useState("signature1");
    const [signature2, setSignature2] = useState("signature2");

    const [dropName, setDropName] = useState("");
    const [newAdded, setNewAdded] = useState([]);

    const [layout, setLayout] = useState([
        { i: "logo", x: 0, y: 0, w: 1, h: 1 },
        { i: "name", x: 2, y: 5, w: 2, h: 1 },
        { i: "heading", x: 1, y: 1, w: 4, h: 3 },
        { i: "subheading", x: 1, y: 7, w: 4, h: 1 },
        { i: "signature1", x: 4, y: 11, w: 1, h: 1 },
        { i: "signature2", x: 1, y: 11, w: 1, h: 1 },
        // { i: "uuid", x: 4, y: 13, w: 2, h: 1, static: true },
    ]);

    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleDragStop = (layout) => {
        console.log(layout);
        setLayout(layout);
    };
    const handleDragStart = (event) => {
        const name = event.target.dataset.name;
        event.dataTransfer.setData("name", name);
        console.log(`name=== ${name}`);
    };

    const handleDrop = (layout, layoutItem, event) => {
        //new element
        const name = event.dataTransfer.getData("name");

        console.log(name);
        // console.log(dropName);
        // Create a new layout item with the dropped element
        const newLayoutItem = {
            i: name,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
        };

        // Update the layout with the new element
        setLayout([...layout, newLayoutItem]);
        console.log(`layout after drop: ${JSON.stringify(layout)}`);
        setNewAdded([...newAdded, newLayoutItem]);
        console.log(`new added array ${JSON.stringify(newAdded)}`);
    };

    //------------------- for downloading pdf----------------------------------------------------------------------------------------------
    const handleDownloadPdf = async() => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");
        //console.log(data);
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        //console.log(imgProperties);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;
        console.log(pdfHeight);
        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        const pdfBlock = pdf.output('blob');
        pdf.save("print.pdf");
        // console.log(pdfBlock);
        const formData = new FormData();
        formData.append("pdf", pdfBlock, "print.pdf");
        
        console.log(formData.get('pdf'));

        // fetch("http://localhost:5000/upload", {
        //     method: "POST",
        //     body: formData,
        //     headers: {
        //         "Content-Type": "multipart/form-data;boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW",
        //     },
        //   })
        //   .then((response) => {
        //     console.log(response);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });

        
        const headers = {
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarydMIgtiA2YeB1Z0kl',
        };

        Axios.post("http://localhost:5000/upload", formData)
        .then((res) => {
            console.log("Success ", res);
        });
        
    };

    return (
        <div className='w-full'>
            <Nav />
            <div className='flex flex-row w-screen h-screen mt-2 p-2'>
                <div className='w-1/4 flex flex-col p-3'>
                    <button
                        onClick={handleDownloadPdf}
                        type='button'
                        className='button m-3'>
                        Export PDF
                    </button>
                    <p className='mt-10 mb-10'>
                        You can add following extra text box in template:
                    </p>
                    <hr className='color-black' />
                    <div {...getRootProps()} className='w-32 h-32 border-2 '>
                        <input {...getInputProps()} />
                        {file ? (
                            <div
                                className='droppable-element'
                                draggable={true}
                                unselectable='on'
                                name='new-logo'
                                data-name='new-logo'
                                onDragStart={handleDragStart}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt='Uploaded Logo'
                                />
                            </div>
                        ) : (
                            <p>
                                Drag and drop your logo here or click to select
                                a file
                            </p>
                        )}
                    </div>
                    <hr />
                    <div
                        className='droppable-element text-lg p-4 text-center'
                        draggable={true}
                        unselectable='on'
                        data-name='sub-heading-1'
                        onDragStart={handleDragStart}>
                        Sub Heading 1 (Drap me!)
                    </div>
                    {/* <div
              className="droppable-element text-lg p-4 text-center"
              draggable={true}
              unselectable="on"
              name="sub-heading-2"
              data-name="sub-heading-2"
              onDragStart={handleDragStart}
            >
              Sub Heading 2 (Drag me!)
            </div> */}
                </div>
                <div
                    className='w-4/6 h-5/6 relative p-2 rounded border-8 border-my-blue'
                    ref={printRef}>
                    <ResponsiveGridLayout
                        className='layout'
                        layouts={{ lg: layout }}
                        breakpoints={{
                            lg: 1200,
                            md: 996,
                            sm: 768,
                            xs: 480,
                            xxs: 0,
                        }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        rowHeight={30}
                        compactType={null}
                        isDraggable={true}
                        isDroppable={true}
                        // onDrag={handleDrag}
                        // onResize={handleResize}
                        onDragStop={handleDragStop}
                        onDrop={handleDrop}>
                        <div key='logo' className=''>
                            <img src={logo} alt='logo' />
                        </div>
                        <div key='name' className='text-6xl font-cookie'>
                            <EditableText
                                content={name}
                                handleChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div
                            key='heading'
                            className='text-5xl uppercase border-b-2 border-my-blue text-center'>
                            <EditableText
                                content={heading}
                                handleChange={(e) => setHeading(e.target.value)}
                            />
                        </div>
                        <div
                            key='subheading'
                            className='text-lg border-t-4 border-my-blue border-dotted p-4 text-center'>
                            <EditableText
                                content={subheading}
                                handleChange={(e) =>
                                    setSubheading(e.target.value)
                                }
                            />
                        </div>
                        <div
                            key='signature1'
                            className='text-lg text-center border-t-4 border-my-blue'>
                            <EditableText
                                content={signature1}
                                handleChange={(e) =>
                                    setSignature1(e.target.value)
                                }
                            />
                        </div>
                        <div
                            key='signature2'
                            className='text-lg text-center border-t-4 border-my-blue'>
                            <EditableText
                                content={signature2}
                                handleChange={(e) =>
                                    setSignature1(e.target.value)
                                }
                            />
                        </div>
                        {/* <div key='uuid' className=''>
                            {uuid}
                        </div> */}
                        {newAdded.map((item) => {
                            if (item.i === "new-logo") {
                                return (
                                    <div key={item.i} className=''>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt='Uploaded Logo'
                                        />
                                    </div>
                                );
                            } else if (
                                item.i === "sub-heading-1" ||
                                item.i === "sub-heading-2"
                            ) {
                                return (
                                    <div
                                        key={item.i}
                                        className='text-lg p-4 text-center'>
                                        <EditableText content={"Sub Heading"} />
                                    </div>
                                );
                            }
                        })}
                    </ResponsiveGridLayout>
                </div>
            </div>
        </div>
    );
};

export default CertificateTemplate;
