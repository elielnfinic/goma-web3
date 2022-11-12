//import {providers} from "ethers";
import Web3 from "web3";
//const provider = new providers.Web3Provider(window.ethereum);


//const ganache = require("ganache-cli");
//const Web3 = require("web3");

const web3 = new Web3(window.ethereum);


const navigation = [
    { name: 'A propos de Goma Web3', href: '#' }
  ]
  
  export default function Menus() {
    const getAddress =  async() => {
      //const addr = await web3.provider.send("eth_requestAccounts", []);
      //alert(addr);
      //check metamask is connected
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.enable();
          console.log("Metamask is connected");
          const accounts = await window.ethereum.request({method : "eth_requestAccounts"});
          console.log(accounts);
          // Acccounts now exposed
        } catch (error) {
          // User denied account access...
          alert("Veuillez vous connecter");
        }
      }
        return;
      
    }

    

    return (
      <header className="bg-indigo-600">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
            <div className="flex items-center">
              <a href="#">
                <span className="sr-only">GomaWeb3</span>
                <img className="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
              </a>
              <div className="ml-10 hidden space-x-8 lg:block">
                {navigation.map((link) => (
                  <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="ml-10 space-x-4">
              <button type="button" onClick={getAddress}
                href="#"
                className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
              >
                Connexion avec Metamask
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
            {navigation.map((link) => (
              <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </header>
    )
  }
  