import React, { useState } from "react";
import { useSelector } from "react-redux";
import CertificateCard from "../components/CertificateCard";
import Nav from "../components/Nav";
const Certificates = () => {
    const [inputValue, setInputValue] = useState("");

    const organization = useSelector(
        (state) => state.CertificateSlice.organizations
    );

    const certificates = useSelector(
        (state) => state.CertificateSlice.certificates
    );

    const events = useSelector((state) => state.CertificateSlice.events);

    const [selectedOrg, setSelectedOrg] = useState("Organizations");
    const [selectedEvent, setSelectedEvent] = useState("Events");
    const handleOrgChange = (e) => {
        setSelectedOrg(e.target.value);
        setSelectedEvent("Events");
    };
    const handleEventChange = (e) => {
        setSelectedEvent(e.target.value);
    };

    return (
        <div className='w-full'>
            <Nav cmp={"certificates"} />
            <div className='w-full px-10 flex justify-center mt-2'>
                {/* <input
                    className='p-2 w-80 rounded-lg outline-my-purple mr-4'
                    type='text'
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    name='input_value'
                    id='input_value'
                    placeholder='Enter token id to fetch certificate details'
                /> */}
                <select
                    name='organization'
                    id='organization'
                    onChange={handleOrgChange}
                    value={selectedOrg}
                    className='p-2 w-80 rounded-lg outline-my-purple mr-4 bg-white'>
                    <option value='Organizations'>Organizations</option>
                    {organization.map((org) => (
                        <option value={org}>{org}</option>
                    ))}
                </select>
                <select
                    name='events'
                    id='events'
                    onChange={handleEventChange}
                    value={selectedEvent}
                    className='p-2 w-80 rounded-lg outline-my-purple mr-4 bg-white'>
                    <option value='Events'>Events</option>
                    {selectedOrg !== "Organizations" &&
                        events[selectedOrg].map((eve) => (
                            <option value={eve}>{eve}</option>
                        ))}
                </select>
            </div>
            <div className='flex justify-center mt-4 rounded-full flex-wrap'>
                {certificates
                    .filter((certy) => {
                        if (selectedOrg === "Organizations") {
                            return true;
                        }

                        if (certy.metadata.organization !== selectedOrg) {
                            return false;
                        }

                        return selectedEvent === "Events"
                            ? true
                            : certy.metadata.event === selectedEvent;
                    })
                    .map((certy) => {
                        return (
                            <div key={certy.id}>
                                <CertificateCard
                                    certificateCID={certy.CertificateCID}
                                    metaData={certy.metadata}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Certificates;
