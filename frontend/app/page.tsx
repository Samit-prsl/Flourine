"use client"

import { useEffect } from "react";
import WEB3 from '../Web3/Web3'
export default function Home() {
 const Private_Address = process.env.NEXT_PUBLIC_MY_ADDRESS!

 const contractInteraction = async () =>{
   
  const Contract = (await WEB3.contractInteraction()).Contract
  const walletAddress = (await WEB3.contractInteraction()).walletAddress

  // const getProducts = await Contract.methods.getProducts().call()
  // console.log(getProducts);
  // const getProduct = await Contract.methods.getProduct(4).call()
  // console.log(getProduct);
  // const updateStocks = await Contract.methods.updateStocks(4,10).send({from:walletAddress})
  // console.log(updateStocks);
  const getProduct = await Contract.methods.getProduct(4).call()
   console.log(getProduct);
  
 }
  useEffect(()=>{
    contractInteraction()
  },[])

  return (
   <>
    <p>Testing</p>
   </>
  )
}
