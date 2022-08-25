import React, {useEffect, useState} from 'react';
import {signOut, useSession} from "next-auth/react";
import Image from 'next/image'
import UserCard from "./UserCard";
import {BsSearch} from "react-icons/bs";
import {BaseURL} from "../util/config";


const SideBar = () => {
	const { data:session } = useSession()
	const [searchTerm,setSearchTerm] = useState('')
	const [searchResults,setSearchResults] = useState([])
	const [chats,setChats] = useState([])
	useEffect(() => {
		getChats()
		.then(() => {
			console.log("Chats fetched successfully")
		})
		.catch((err) => {
			console.log("Fetch errr",err)
		})
	},[])

	const getChats = async () => {
		try {

			const searchRes = await fetch(`${BaseURL}/chat/mychats/${session.user.email}`)
			const res = await searchRes.json()
			console.log("Chats res",res)
			setChats(res.chats)
		}catch (e){
			console.log('error in search users')
			console.log(e)
		}
	}

	const SearchUser = async (e) => {
		setSearchTerm(e.target.value)
		if (searchTerm ===''){
			setSearchResults([])
		}else {
			try {
				const searchRes = await fetch(`${BaseURL}/user/search?query=${e.target.value}`)
				const res = await searchRes.json()
				console.log(res)
				setSearchResults(res.users)
			}catch (e){
				console.log('error in search users')
				console.log(e)
			}
		}
	}
	return (
		<div className='w-1/3 border border-black flex flex-col rounded-l'>
			<div className='w-full h-16 border-b-black flex items-center justify-around px-2'>
				<div className='w-12 h-12 relative' onClick={() => signOut()}>
					<Image src={session.user.image} layout='fill' className='rounded-3xl' alt={session.user.name} />
				</div>
				<div className='w-5/6'>
					<h2>{session.user.email}</h2>
					<h2>{session.user.name}</h2>
				</div>
			</div>
			<div className='w-full h-16 p-2 flex items-center px-2'>
				<div className={`bg-gray-100 p-1 border-2 border-solid border-gray-600 rounded-md w-1/2 mx-2 flex  md:w-80`}>
					<input
						value={searchTerm}
						onChange={SearchUser}
						type='text'
						placeholder='Search......'
						className='p-1 bg-gray-100 ml-2 h-8 w-4/5 flex-1 outline-none text-black  '
					/>

					<div className='hover:bg-gray-300 rounded'>
						<button disabled={searchTerm === ''} type="submit" className='p-2' >
							<BsSearch color='black'/>
						</button>
					</div>
				</div>
			</div>
			{
				searchResults.map((user,index) => {
					return <UserCard key={index} user={user}/>
				})
			}
			<div className="w-full h-8 flex justify-center items-center">
				<h1>My Chats</h1>
			</div>

			{
				chats.map((chat,index) => {
					return <UserCard key={index} user={chat}/>
				})
			}
		</div>
	);
};

export default SideBar;
