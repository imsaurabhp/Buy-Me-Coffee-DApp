import React, { useState, useEffect } from 'react'
import {ethers} from "ethers"

const Memo = ({state}) => {
    const [donations, setDonations] = useState([])
    const {contract} = state

    useEffect(() => {
        const donationMessage = async() => {
            const donations = await contract.methods.getDonations().call()
            setDonations(donations)
            console.log(donations)
        }
        contract && donationMessage()
    }, [contract])

  return (
    <>
    <div className='flex flex-cols w-ful h-[55vh] justify-center'>
        <div className='w-3/6'>
            
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Coffee bought of
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation,index)=>{
                            const timestamp = BigInt(donation.timestamp) * BigInt(1000);
                            const gmtTime = new Date(timestamp).toGMTString();
                            return(
                                <tr key={index} className="dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {donation.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {donation.message}
                                    </td>
                                    <td className="px-6 py-4">
                                        {gmtTime.toString()} {/* This is the issue*/}
                                    </td>
                                    <td className="px-6 py-4">
                                        {String(donation.value / (BigInt(10) ** BigInt(18)))} Eth
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