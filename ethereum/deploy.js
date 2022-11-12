const dotenv = require("dotenv");
dotenv.config();

const HDWwalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const compiledNFTMarket = require(path.resolve(__dirname,"build","NFTMarket.json"));

const provider = new HDWalletProvider(
    process.env.MNEMONIC_STRINC,
    process.env.INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async() => {
    try{
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0],compiledNFTMarket.bytecode.object);

    const result = await new web3.eth.Contract(compiledNFTMarket.abi)
                            .deploy({data : compiledNFTMarket.bytecode.object})
                            .send({gas : '10000000',from : accounts[0]});
    
    
    console.log(`Contract deployed at ${result.options.address}`);

    provider.engine.stop();
    }catch(ex){
        console.log(ex);
    }
}

deploy();