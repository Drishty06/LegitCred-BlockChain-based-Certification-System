import React from "react";

const CertificateCard = ({ certificateCID, metaData }) => {
    return (
        <div className='bg-white rounded-2xl pb-2 m-3'>
            <iframe
                className='rounded-2xl'
                src={`https://gateway.pinata.cloud/ipfs/${certificateCID}#toolbar=0&output=embed`}></iframe>
            <p className='mx-2 font-bold text-lg'>Name: {metaData.name}</p>
            <p className='mx-2 text-gray-700 text-xs'>
                Organization: {metaData.organization}
            </p>
            <p className='mx-2 text-gray-700 text-xs'>
                Event: {metaData.event}
            </p>
            {/* {console.log(metaData)} */}
        </div>
    );
};

export default CertificateCard;
