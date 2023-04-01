import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
const DynamicGrid = () => {
  const [items, setItems] = useState([
    { id: 1, color: 'red' },
    { id: 2, color: 'blue' },
    { id: 3, color: 'green' },
    { id: 4, color: 'yellow' },
    { id: 5, color: 'orange' },
  ]);
 
//   useEffect(() => {
//     const CID = 'QmVfECCzTGpzJrFj3GqntPm7Dwha6irjV7zwuA6v1V7D5N';
//     const endpointUrl = `https://gateway.pinata.cloud/ipfs/${CID}`;
//     const headers = {
//         'pinata_api_key': "cf67719bb3526f5e84f5",
//         'pinata_secret_api_key': "9dc1e3c6369a24323f84246f6458d71017ff4f11340bcf362bdd5feceb0cac21",
//       };
//     axios.get(endpointUrl, {headers})
//         .then(response => {
//             console.log(response.data);
//         })
//         .catch(error => {
//             console.error(error);
//     })
//   }, []);
const CID = 'QmVfECCzTGpzJrFj3GqntPm7Dwha6irjV7zwuA6v1V7D5N';
    const endpointUrl = 'https://gateway.pinata.cloud/ipfs/QmVfECCzTGpzJrFj3GqntPm7Dwha6irjV7zwuA6v1V7D5N';
    const headers = {
        'pinata_api_key': "cf67719bb3526f5e84f5",
        'pinata_secret_api_key': "9dc1e3c6369a24323f84246f6458d71017ff4f11340bcf362bdd5feceb0cac21",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      };
function temp(){
    axios.get(endpointUrl, {headers})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
    })
}
temp();

  const gridTemplateColumns = `repeat(${items.length}, 1fr)`; // Create a CSS grid template with a number of columns based on the number of items

  return (
    <div className=''>
        <h1 className='text-5xl'>Market Place For NFTs</h1>
        <div className="grid-container " style={{ gridTemplateColumns }}>
        {items.map((item) => (
            <div className="grid-item border-2 border-my-blue p-4 m-2 w-[300px] h-[400px]" key={item.id} >
            {item.color}
            </div>
        ))}
        </div>
    </div>
  );
};

export default DynamicGrid;
