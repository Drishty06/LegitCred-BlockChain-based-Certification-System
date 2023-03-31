import React, { useState, useRef, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {useDropzone} from 'react-dropzone'

import EditableText from '../components/Editable_text';
import Nav from '../components/Nav';

import logo from '../assets/logo-certificate.png'
import line from '../assets/353-3531060_decorative-lines-png-transparent-images-clock-png-download-removebg-preview.png'
const ResponsiveGridLayout = WidthProvider(Responsive);

const CertificateTemplate = () => {
  const printRef = useRef();
  const [certiData, setCertiData] = useState({
    logo: "",
    name: "Your Name",
    heading: "certificate of completion",
    eventName: "Machine Learning",
    date: "31st March 2023",
    subheading: "This certificate is awarded for successfully completing a course of",
    signature1: "signature1",
    signature2: "signature2",
  })
  const [dropName, setDropName] = useState('');
  const [newAdded, setNewAdded] = useState([]);

  const [layout, setLayout] = useState([
    { i: 'logo', x: 0, y: 0, w: 1, h: 1},
    { i: 'name', x: 2, y: 6, w: 2, h: 1},
    { i: 'heading', x: 1, y: 1, w: 4, h: 3 },
    { i: 'subheading', x: 1, y: 8, w: 4, h: 1 },
    { i: 'signature1', x: 4, y: 12, w: 1, h: 1},
    { i: 'signature2', x: 1, y: 12, w: 1, h: 1},
  ]);


  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });



  const handleChangeOfCerti = (e) => {
    const {name, value} = e.target;
    setCertiData((prevData) => ({
            ...prevData,
            [name]: value,
    }));
  }
  const handleDragStop = (layout) => {
    console.log(layout);
    setLayout(layout);
  }
  const handleDragStart = (event) => {
    const name = event.target.dataset.name;
    event.dataTransfer.setData('name', name);
    console.log(`name=== ${name}`);
  };

  const handleDrop = (layout, layoutItem, event) => {

    //new element 
    const name = event.dataTransfer.getData('name');
    
    console.log(name);
    // console.log(dropName);
    // Create a new layout item with the dropped element
    const newLayoutItem = {
      i: name,
      x: layoutItem.x,
      y: layoutItem.y,
      w: layoutItem.w,
      h: layoutItem.h
    };
    
    console.log(layoutItem);
    // Update the layout with the new element
    setLayout([...layout, newLayoutItem]);
    console.log(`layout after drop: ${JSON.stringify(layout)}`)
    setNewAdded([...newAdded, newLayoutItem]);
    console.log(`new added array ${JSON.stringify(newAdded)}`);
  };


  //------------------- for downloading pdf----------------------------------------------------------------------------------------------
    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
    
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf');
  };
  return (
    <div className='w-full'>
    <Nav />
    <div className='flex flex-row w-screen h-screen mt-2 p-2'>
        <div className='w-1/4'>
            <button onClick={handleDownloadPdf} type="button" className='button m-3'>Export PDF</button>
            <p>You can add following extra text box in template:</p>
            <hr className='color-black'/>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {file ? (
                <div
                  className="droppable-element"
                  draggable={true}
                  unselectable="on"
                  name="new-logo"
                  data-name="new-logo"
                  onDragStart={handleDragStart}
                >
                  <img src={URL.createObjectURL(file)} alt="Uploaded Logo" />
                </div>
                
              ) : (
                <p>Drag and drop your logo here or click to select a file</p>
              )}
            </div>
            <hr />
            <div
              className="droppable-element text-lg p-4 text-center"
              draggable={true}
              unselectable="on"
              
              data-name="sub-heading-1"
              onDragStart={handleDragStart}
            >
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
        <div className='w-4/6 h-5/6 relative p-2 rounded border-8 border-my-blue' ref={printRef}>
            <ResponsiveGridLayout className="layout" 
            layouts={{ lg: layout }}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            rowHeight={30}
            compactType={null}
            isDraggable={true}
            isDroppable={true}
            // onDrag={handleDrag}
            // onResize={handleResize} 
            onDragStop={handleDragStop}
            onDrop={handleDrop}
            >
            <div key="logo" className=''>
                <img src={logo} alt='logo'/>
            </div>
            <div key="name" className='text-6xl font-cookie'>
                <EditableText content={`<h1>${certiData.name}</h1>`} handleChange={handleChangeOfCerti}/>
            </div>
            <div key="heading" className='text-5xl uppercase border-b-2 border-my-blue text-center'>
                <EditableText content={`<h2>${certiData.heading}</h2>`} handleChange={handleChangeOfCerti}/>
            </div>
            <div key="subheading" className='text-lg border-t-4 border-my-blue border-dotted p-4 text-center'>
                <EditableText content={`<p>${certiData.subheading} <b>${certiData.eventName}</b> on <b>${certiData.date}</b>.</p>`}  handleChange={handleChangeOfCerti}/>
            </div>
            <div key="signature1" className='text-lg text-center border-t-4 border-my-blue'>
                <EditableText content={`<p>${certiData.signature1}</p>`} handleChange={handleChangeOfCerti}/>
            </div>
            <div key="signature2" className='text-lg text-center border-t-4 border-my-blue'>
                <EditableText content={`<p>${certiData.signature2}</p>`} handleChange={handleChangeOfCerti}/>
            </div>
            {newAdded.map((item => {
              if(item.i === 'new-logo'){
                return(
                  <div key={item.i} className=''>
                    <img src={URL.createObjectURL(file)} alt="Uploaded Logo" />
                  </div>
                )
              }else if(item.i === 'sub-heading-1' || item.i === 'sub-heading-2'){
                return(
                  <div key={item.i} className='text-lg p-4 text-center'>
                    <EditableText content="<p>Sub Heading</p>" />
                  </div>
                )
              }
            }))}
            </ResponsiveGridLayout>
        </div>         
    </div>
    
    </div>
  );
};

export default CertificateTemplate;



