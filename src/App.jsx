import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CertificateTemplate from "./views/CertificateTemplate";

import Home from "./views/Home";
import Issue from "./views/Issue";
import Retrieve from "./views/Retrieve";
import Verify from "./views/Verify";
const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route index element={<Home />} />
                        <Route path='issue-certificate' element={<Issue />} />
                        <Route path='certificates' element={<Verify />} />
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
