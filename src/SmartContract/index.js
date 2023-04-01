import contract from "./abi.json";
import { ethers } from "ethers";
const contractAddress = "0x2804890391df306A55049913cED665d9FE5D7ba8";

const infuraProvider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/zEotRHIHt762GqCfnaj6tDD0ZH-GswVB"
);
const walletProvider = new ethers.providers.Web3Provider(ethereum);

const getContractData = new ethers.Contract(
    contractAddress,
    contract.abi,
    infuraProvider
);
const sendContractData = new ethers.Contract(
    contractAddress,
    contract.abi,
    walletProvider.getSigner()
);

const requestAccount = async () => {
    await ethereum.request({
        method: "wallet_requestPermissions",
        params: [
            {
                eth_accounts: {},
            },
        ],
    });

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    console.log(accounts);
    setAddress(accounts[0]);
};

export const verifyCertificates = async (organization, event, certificates) => {
    const res = await getContractData.is_cerificate_verified(
        organization,
        event,
        certificates[0]
    );
    console.log(certificates[0]);

    // await res.wait();

    console.log(res);
};

export const mintNFT = async (json, certificate) => {
    // const res = await sendContractData.set_record(
    //     organization,
    //     event,
    //     certificates
    // );

    console.log(json, certificate);
    console.log(json + "," + certificate);
    const res = await sendContractData.mint(
        "0x1fB06aff012815596121bFd86dD30B67fd3E54E0",
        json + "," + certificate
    );

    await res.wait();

    console.log(res);
};
