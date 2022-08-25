import React, {useEffect} from 'react';
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import {BaseURL, socket} from "../util/config";
import {useSession} from "next-auth/react";
import activeChatReducer from "../ReduxStore/ActiveChatReducer";


const ChatScreen = () => {
	const user = useSession()

	const addUser = async () => {
		try {

			const res = await fetch(`${BaseURL}/user/add`,{
				method:'POST',
				body:JSON.stringify(user.data.user),
				headers:{
					'Content-Type':'application/json'
				},
			})
			const data = await res.json()

		}catch (e){
			console.log('Exception in useEffect')
			console.log(e)
		}
	}
	useEffect(() => {
		addUser().then(() => {

			socket.emit("connected",{ email:user.data.user.email })
		})


	}, []);
	return (
		<div className='w-full h-full flex justify-center items-center '>
			<div className='w-full h-5/6 border border-black flex max-w-screen-xl rounded'>
				<SideBar/>
				<ChatBox/>
			</div>
		</div>
	);
};

export default ChatScreen;
