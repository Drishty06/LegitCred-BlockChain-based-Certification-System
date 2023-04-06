import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

export const getCertificate = async (req, res, next) => {
    const API_KEY = process.env.API_KEY;
    const SECRET_KEY = process.env.SECRET_KEY;
    const CID = process.env.CID;

    const endpointUrl = `https://gateway.pinata.cloud/ipfs/${CID}`;

    // const options = {
    //     headers: {
    //         pinata_api_key: API_KEY,
    //         pinata_secret_api_key: SECRET_KEY,
    //     },
    // };

    axios
        .get(endpointUrl)
        .then((response) => {
            console.log(response.data); // Certificate data
            res.send(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    // const response = await axios.get(
    //     `https://api.pinata.cloud/pinning/pins/QmbtCTYrau1g1jr9aG8S36yXp57iuJ8ENdZdx414vSGp1N`,
    //     {
    //         headers: {
    //             Authorization: `Bearer 108f9ff4adda6ee6f8cd`,
    //         },
    //     }
    // );
    // console.log(response);

    // res.send(response);
};
