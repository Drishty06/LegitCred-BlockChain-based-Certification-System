import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./views/Home";
import Issue from "./views/Issue";
import Retrieve from "./views/Retrieve";
import CertificateTemplate from "./views/CertificateTemplate";
import Certificates from "./views/Certificates";
import Verify from "./views/Verify";
import { requestAccount, getCount, getMetaData } from "./SmartContract";
import axios from "axios";
import { certificateActions } from "./store/certificate-slice";

const App = () => {
    const dispatch = useDispatch();
    const myFun = async () => {
        // requestAccount();
        const count = await getCount();
        // const organizations = new Set();
        
        for (let tokenId = 1; tokenId <= count; tokenId++) {
            getMetaData(tokenId)
            
                .then((result) => {
                    console.log("count = " + tokenId);
                    console.log(result);
                    const [jsonCID, CertificateCID] = result.split(",");

                    // console.log(jsonCID, CertificateCID);
                    axios
                        .get(`https://gateway.pinata.cloud/ipfs/${jsonCID}`,{
                            // headers:{
                            // "x-frame-options":"allow"
                            // }
                        })
                        .then((response) => {
                            // console.log(response.data);
                            // organizations.add(response.data.organization);
                            dispatch(
                                certificateActions.addCertificate({
                                    CertificateCID,
                                    metadata: response.data,
                                    id: tokenId,
                                })
                            );
                        })
                        .catch((error) => console.error(error));
                })
                .catch((err) => {
                    console.log(err);
                });
                
        }
        // dispatch(certificateActions.setOrganizations([...organizations]));
    };
    useEffect(() => {
        myFun();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route index element={<Home />} />
                        <Route path='issue-certificate' element={<Issue />} />
                        <Route path='certificates' element={<Certificates />} />
                        <Route
                            path='retrieve-certificate'
                            element={<Retrieve />}
                        />
                        <Route
                            path='editCerti'
                            element={<CertificateTemplate />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
