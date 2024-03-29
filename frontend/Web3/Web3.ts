import {abi} from '../../backend/artifacts/contracts/Flourine.sol/ABI'
import web3 from 'web3'
declare var window : any

const Provider = new web3.providers.HttpProvider('https://sepolia.infura.io/v3/60fbafe6718542359776897c4cfec070')
const Web3 = new web3(Provider)
const address = '0xceFB450136FDFa044cb8018a1070377126CE4c1c'
const Private_Key = process.env.NEXT_PUBLIC_METAMASK_PRIVATE_KEY!
let walletAddress  = ''

 const setMetamaskWallet = async ()=> {
  if (window.ethereum) {
    await window.ethereum.enable();
    const Wallet = new web3(window.ethereum);
    const accounts = await Wallet.eth.getAccounts();
    walletAddress = accounts[0]
    //console.log(walletAddress);
  } else {
    console.error("No Ethereum provider found");
    alert("Install Metamask to continue")
  }
  return walletAddress
}

 const setWalletAddressToWeb3 = () =>{
    const setAccount = Web3.eth.accounts.privateKeyToAccount('0x'+Private_Key)
    Web3.eth.accounts.wallet.add(setAccount)
  }

 const connectToSmartContract = (address:string) =>{
    const contract = new Web3.eth.Contract(abi,address)
    return contract
 }

 const contractInteraction = async () =>{

    const walletAddress = await setMetamaskWallet()
    setWalletAddressToWeb3()
    const Contract = connectToSmartContract(address)
    return {
        walletAddress,Contract
    }
 }

export default  {
    setMetamaskWallet,setWalletAddressToWeb3,connectToSmartContract,contractInteraction
}