const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname,"build");
fs.removeSync(buildPath);

const nftMarketPath = path.resolve(__dirname,"contracts","NFTMarket.sol");
console.log(nftMarketPath);
const source = fs.readFileSync(nftMarketPath,'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'NFTMarket': {content : source}
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));//.contracts.NFTMarket;

console.log(output);

/*
fs.ensureDir(buildPath);
for(let contract in output){
    fs.outputJSONSync(path.resolve(buildPath,contract.replace(':','') + '.json'),output[contract]);
}*/