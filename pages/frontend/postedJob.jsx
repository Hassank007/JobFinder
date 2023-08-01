import { get_my_posted_job } from '@/Services/job';
import { setMyJobs } from '@/Utils/JobSlice';
import JobsCard from '@/components/JobsCard';
import NavBar from '@/components/NavBar'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import useSWR from 'swr'

export default function PostedJobs() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.User?.userData)
    const myJobs = useSelector(state => state?.Job?.myJobs);
    const id = user?._id



    useEffect(() => {
        if (!id || !Cookies.get('token')) {
            router.push('/auth/login')
        }
    }, [user, id, Cookies])


    const { data, error, isLoading } = useSWR('/getMyPostedJobs', () =>  get_my_posted_job(id))
    
    useEffect(() => {
        if(data) dispatch(setMyJobs(data?.data))
    }, [data , dispatch])

    if(error) toast.error(error)

    return (
        <>
            {
                isLoading ? (

                    <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
                        <InfinitySpin width='200' color="#4f46e5" />
                        <p className='text-xs uppercase'>Loading Resources Hold Tight...</p>
                    </div>
                ) : (
                    <>
                        <NavBar />
                        <div className='w-full  pt-20'>
                            <div className='w-full h-20 bg-gray-50 text-cyan-600 font-bold flex items-center justify-center flex-col'>
                                <h1 className='text-3xl'>Posted Jobs</h1>
                            </div>
                            <div className='w-full h-full px-4 py-4 flex  overflow-y-auto  items-start justify-center flex-wrap'>
                                {
                                    myJobs?.map((job, index) => (
                                        <JobsCard key={index} job={job}  posted={true}/>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
pragma solidity >=0.5.0 <0.6.0;

contract ZombieFactory {

    // declare our event here

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function _createZombie(string memory _name, uint _dna) private {
        zombies.push(Zombie(_name, _dna));
        // and fire it here
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}