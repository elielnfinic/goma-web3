const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compiledNFTMarket = require("../ethereum/build/NFTMarket.json");
const compiledNFT = require("../ethereum/build/NFT.json");

let accounts;
let nftMarket;

let {abi, bytecode} = compiledNFTMarket;
let nft_abi = compiledNFT.abi;
let nft_bytecode = compiledNFT.bytecode;

let nftMarketAddress = 0;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    console.log(accounts);
    //console.log("Solde est " + await web3.eth.getBalance(accounts[0]));

    nftMarket = await new web3.eth.Contract(abi)
        .deploy({data : bytecode.object})
        .send({from : accounts[0],gas : '3000000'});

    nftMarketAddress = nftMarket.options.address;
    
    
    
});

describe('NFTMarket', () => {
    it("peut etre deploye", () => {
        assert.ok(nftMarket);
    });

    it("ajouter un item au marche", async() => {
        const deploy_obj = {data : nft_bytecode.object, arguments: [nftMarketAddress]};

        let nft = await new web3.eth.Contract(nft_abi)
                    .deploy(deploy_obj)
                    .send({from : accounts[0], gas : '3000000'});

        let token_ = await nft.methods.createToken("https://troto.co")
                            .send({from : accounts[0], gas : '3000000'});

        const token_id = token_.events.Transfer.returnValues.tokenId;


        console.log(`nft `,nft.options.address);

        const market_item = await nftMarket.methods.createMarketItem(nft.options.address,token_id,12).send({
            from : accounts[0],
            gas : '3000000',
            value : web3.utils.toWei('0.0025','ether')
        });


        assert.equal(market_item.status, true);
    });

    it("peut recuperer les items du marche", async() => {
        const items = await nftMarket.methods.fetchMarketItems().call();
        console.log(items);
        assert.ok(items);
    });

    it("peut recuperer mes items",async () => {
        const my_nfts = await nftMarket.methods.fetchMyNFS().call();
        console.log(my_nfts);
        assert.ok(my_nfts);
    });

    it("peut acheter des items", async() => {
        //const nft_adr = 0x2B5D9334275a126108e6ad871D4337cAa5fe4C3E;
        const deploy_obj = {data : nft_bytecode.object, arguments: [nftMarketAddress]};

        let nft = await new web3.eth.Contract(nft_abi)
                    .deploy(deploy_obj)
                    .send({from : accounts[0], gas : '3000000'});

        let token_ = await nft.methods.createToken("https://troto.co")
                            .send({from : accounts[0], gas : '3000000'});

        const token_id = token_.events.Transfer.returnValues.tokenId;


        console.log(`nft `,nft.options.address);

        const market_item = await nftMarket.methods.createMarketItem(nft.options.address,token_id,12).send({
            from : accounts[0],
            gas : '3000000',
            value : web3.utils.toWei('0.0025','ether')
        });

        await nftMarket.methods.createMarketSalte(nft.options.address,0).send({
            from : accounts[1],
            gas : '3000000',
            value : web3.utils.toWei('0.003','ether')
        });
        
    });

});