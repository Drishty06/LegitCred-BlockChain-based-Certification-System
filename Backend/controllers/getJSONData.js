import axios from "axios";

export const getJSONData = async (req, res, next) => {
    const jsonCID = req.params.jsonCID;
    const endpointUrl = `https://gateway.pinata.cloud/ipfs/${jsonCID}`;

    axios
        .get(endpointUrl)
        .then((response) => {
            console.log(response.data); // Certificate data
            res.send(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
};
