import React, { useState, useEffect } from 'react'
import {ethers} from "ethers"

const Memo = ({state}) => {
    const [donations, setDonations] = useState([])
    const {contract} = state

    const ChangeToLocaleTime = (timestamp) => {
        const dateObject = new Date(Number(timestamp) * 1000);

        // Use toLocaleString with timeZone option to convert to IST
        const options = { timeZone: 'Asia/Kolkata' };
        const formattedDateTime = dateObject.toLocaleString('en-US', options);
        return(`${formattedDateTime}`)
    }
    const ConvertToEth = (weiValue) =>{
        const Eth = ethers.formatEther(String(weiValue))
        return Eth
    }

    useEffect(() => {
        const donationMessage = async() => {
            const donates = await contract.methods.getDonations().call()
            setDonations(donates.reverse().slice(0, 5))
        }
        contract && donationMessage()
    }, [contract])

  return (
    <>
    <div className='flex flex-cols w-ful min-h-[50vh] justify-center'>
        <div className='w-full sm:w-full md:w-5/6 xl:w-4/6'>
            <h1 className='font-bold text-left uppercase'>These awesome folks caffeinated my day! </h1>
            <div className="relative overflow-x-auto">
                <table className="w-full my-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-1">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-1">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-1">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-1 text-right">
                                Caffeinated me with
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation,index)=>{
                            // const timestamp = BigInt(donation.timestamp) * BigInt(1000);
                            // const gmtTime = new Date(donation.timestamp).toGMTString();
                            return(
                                <tr key={index} className="dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {donation.name}
                                    </th>
                                    <td className="px-6 py-1">
                                        {donation.message}
                                    </td>
                                    <td className="px-6 py-1">
                                        {ChangeToLocaleTime(donation.timestamp)} IST
                                    </td>
                                    <td className="px-6 py-1 text-right">
                                        {String(ConvertToEth(donation.value))} Eth
                                    </td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    </>
  )
}

export default Memo