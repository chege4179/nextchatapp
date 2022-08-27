import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SelectActiveChat} from "../ReduxStore/ActiveChatReducer";
import Image from 'next/image'
import {AiOutlineSearch} from "react-icons/ai";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoSendSharp } from 'react-icons/io5';
import { MyMessage,ReceiverMessage } from "./Message";
import {useSession} from "next-auth/react";
import {BaseURL, socket} from "../util/config";
import moment from "moment";
import activeMessagesReducer, {SelectMessages} from "../ReduxStore/ActiveMessagesReducer";
import {UserActions} from "../ReduxStore/UserConstants";

const ChatBox = () => {
	const dispatch = useDispatch()
	const session = useSession()
	const user = session.data
	const activeChat = useSelector(SelectActiveChat)
	const activeMessages = useSelector(SelectMessages)
	const [messageText,setMessageText] = useState("")
	const [messages,setMessages] = useState([])
	const [isOnline,setIsOnline] = useState(false)
	const chatBox = useRef()
	const AlwaysScrollToBottom = () => {
		const elementRef = useRef();
		useEffect(() => elementRef.current.scrollIntoView());
		return <div ref={elementRef} />;
	};

	useEffect(() => {
		console.log("Active Chat",activeChat)
		if (activeChat !== null){
			socket.on("receive-message",(message) => {
				console.log("Receive Message Event")
				if (message.receiver === user.user.email){
					// fetchMessages()
					dispatch({
						type:UserActions.ADD_MESSAGE,
						payload:message
					})
					console.log("Message added on receiver")
				}
			})
		}
	},[])

	const fetchMessages = async () => {
		try {
			const searchRes = await fetch(`${BaseURL}/chat/message/${user.user.email}/${activeChat.email}`)
			const res = await searchRes.json()
			console.log("Chat messages res",res)
			dispatch({
				type:UserActions.SET_ACTIVE_MESSAGES,
				payload:res.messages
			})

		}catch (e){
			console.log('error in search users')
			console.log(e)
		}
	}

	useEffect(() => {
		if (activeChat !== null){
			fetchMessages()
		}
	},[activeChat])


	const SendMessage = () => {
		console.log("user",user)
		const message = {
			message:messageText,
			sender:user.user.email,
			sentAt:moment().format('LT'),
			receiver:activeChat.email,
		}

		setMessageText("")
		socket.emit("send-message",{
			to:activeChat.email,
			from:user.user.email,
			message
		})
		dispatch({
			type:UserActions.ADD_MESSAGE,
			payload:{ ...message,id:Math.floor((Math.random() * 1000) + 1) }
		})
		console.log("Message added on sender")

	}
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			if (messageText !== ""){
				SendMessage()
			}
		}
	}


	return (
		<div className='w-full h-full '>
			{
				activeChat !== null ? (
					<div className='w-full h-full flex flex-col'>
						<div className='w-full h-16 px-4 flex items-center justify-between border border-black'>
							<div className=''>
								<div className='w-12 h-12 relative' onClick={fetchMessages}>
									<Image layout='fill' src={activeChat.imageUrl} className='rounded-3xl '/>
								</div>
							</div>
							<div className='w-full pl-8 flex justify-between'>
								<div>
									<h1 className='font-bold '>{activeChat.name}</h1>
									<h1 className={`font-bold ${isOnline ? 'text-green-500': 'text-red-500'}`}>
										{isOnline ? "User is Online" : "User is offline"}
									</h1>
								</div>

								<div className='flex justify-evenly'>
									<AiOutlineSearch size={23} />
									<BsThreeDotsVertical size={23}/>
								</div>
							</div>
						</div>
						<div className='w-full h-full flex-1 overflow-y-scroll p-4' ref={chatBox}>
							{
								activeMessages.map((message,index) => {
									if (message.sender === user.user.email){
										return (
											<MyMessage message={message} key={index} imageUrl={user.user.image}/>
										)
									}else {
										return (
											<ReceiverMessage message={message} key={index} imageUrl={activeChat.imageUrl}/>
										)
									}

								})
							}
							<AlwaysScrollToBottom/>
						</div>
						<div className='border-2 border-black w-full  flex flex-col '>
							<div className='w-full h-12  flex items-center justify-between px-4'>
								<input
									value={messageText}
									type='text'
									onChange={(e) =>setMessageText(e.target.value)}
									className='w-full h-full outline-none'
									placeholder='Type message........'
									onKeyDown={handleKeyDown}
								/>
								<div onClick={SendMessage} className="cursor-pointer hover:bg-gray-500 rounded-2xl p-2  w-10 h-10 flex items-center justify-center">
									<IoSendSharp size={23} />
								</div>

							</div>
						</div>
					</div>

				):(
					<div className="w-full h-full flex items-center justify-center">
						<h1>Welcome to this Chat App</h1>
					</div>

				)
			}

		</div>
	);
};

export default ChatBox;
