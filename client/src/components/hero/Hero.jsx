import "./Hero.css"
import { PiCoffeeFill } from "react-icons/pi";
import CoffeeImg from '../../assets/coffee.jpg'
import {ethers} from "ethers"

const Hero = ({state}) => {

    const buyCoffee = async(event) =>{
        try{
            event.preventDefault();
            const {contract, account} = state
            const name = document.querySelector("#name").value
            const message = document.querySelector("#message").value
            const ethVal = document.querySelector("#ethVal").value
            const amount = ethers.parseEther(ethVal)

            const transaction = await contract.methods.donateEth(name, message).send({from: account, value: amount});
            console.log("Transaction successful")
            window.location.reload();
        }
        catch(error){
            alert("Transaction Failed!")
        }
    }

    return (
        <>
            <div className="w-full min-h-[5vh] pt-2 flex justify-center">
                <p><span className="font-bold uppercase">Connected Account : </span>{state.account}</p>
            </div>
            <div className='flex flex-cols h-[45vh]'>
                <div className='w-1/2 flex items-center justify-center'>
                    <img src={CoffeeImg} className='w-100 h-100 sm:w-full sm:h-full object-contain' />
                </div>
                <div className='w-1/2 flex items-center justify-start'>
                    <div className='w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-2/5'>
                        <form onSubmit={buyCoffee} className='flex flex-col items-center gap-4'>
                            <input type="text" id="name" className='rounded-full w-full py-2 px-10' placeholder='Name' required/>
                            <input type="text" id="message" className='rounded-full w-full py-2 px-10' placeholder='Message' required />
                            <input type="decimal" id="ethVal" className='rounded-full w-full py-2 px-10 appearance-none' placeholder='Ethers(in Wei)' min="0" required/>
                            <button type="submit" className='bg-green-200 rounded-full w-full py-2 flex flex-rows justify-center items-center gap-4' disabled={!state.contract}>Buy me some <PiCoffeeFill className='w-7 h-7'/></button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero