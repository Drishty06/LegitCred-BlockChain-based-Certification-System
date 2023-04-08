import { createSlice } from "@reduxjs/toolkit";

// Reducer Functions

// Add a certificate
const addCertificate = (state, action) => {
    const org = action.payload.metadata.organization;
    const eve = action.payload.metadata.event;
    const newOrganizations = new Set([...state.organizations, org]);
    state.certificates.push(action.payload);
    state.organizations = [...newOrganizations];

    if (!state.events[org]) {
        state.events[org] = [eve];
    } else {
        const newEvents = new Set([...state.events[org], eve]);
        state.events[org] = [...newEvents];
    }
};
const setOrganizations = (state, action) => {
    state.organizations = action.payload;
};

const initialState = {
    organizations: [],
    events: {},
    certificates: [],
};
const certificateSlice = createSlice({
    name: "certificate-slices",
    initialState,
    reducers: {
        addCertificate,
        setOrganizations,
    },
});

export const certificateActions = certificateSlice.actions;

export default certificateSlice;
