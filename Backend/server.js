const express = require("express");
const app = express();
const dotenv = require();
dotenv.config();
const axios = require('axios');

app.listen(3000, function(req,res){
    console.log("server running on 3000");
} );

app.get("/", function(req,res){
 

const API_KEY = process.env.API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const CID = process.env.CID;
 // Replace with your Pinata secret key

const endpointUrl = `https://gateway.pinata.cloud/ipfs/${CID}`;
const options = {
    headers: {
      pinata_api_key: API_KEY,
      pinata_secret_api_key: SECRET_KEY,
      "Content-Type":"application/pdf"
    }
  };
  
  axios.get(endpointUrl, options)
    .then(response => {
      console.log(response.data); // Certificate data
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    
})




