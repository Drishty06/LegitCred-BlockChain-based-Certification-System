import contract from "./abi.json";
import { ethers } from "ethers";
const contractAddress = "0xEc59Db10255668D6e0df90D1eac9e89a06924a77";

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

export const requestAccount = async () => {
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

export const getCount = async () => {
    const res = await getContractData.getCount();

    // console.log(res.toNumber());
    return res.toNumber();
};

export const getMetaData = async (tokenId) => {
    console.log("calling metadata");
    const res = await getContractData.getMetaData(tokenId);

    // console.log(res);
    return res;
};

export const mintNFT = async (json, certificate) => {
    console.log("Minting NFT");
    console.log(json + "," + certificate + "JSON,CERTIFICATe");
    const res = await sendContractData.mint(
        "0x1fB06aff012815596121bFd86dD30B67fd3E54E0", // recipant Address
        json + "," + certificate
    );

    await res.wait();

    console.log(res);
    console.log(res.value);
    console.log(res.value.toNumber());
};
