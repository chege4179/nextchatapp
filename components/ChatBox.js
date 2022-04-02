import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {SelectActiveChat} from "../ReduxStore/ActiveChatReducer";
import Image from 'next/image'
import {AiOutlineSearch} from "react-icons/ai";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoSendSharp } from 'react-icons/io5';
import { MyMessage,ReceiverMessage } from "./Message";
import {useSession} from "next-auth/react";
import {BaseURL, socket} from "../util/config";
import moment from "moment";

const ChatBox = () => {
	const session = useSession()
	const user = session.data
	const activeChat = useSelector(SelectActiveChat)
	const [messageText,setMessageText] = useState("")
	const [messages,setMessages] = useState([])
	const chatBox = useRef()
	const AlwaysScrollToBottom = () => {
		const elementRef = useRef();
		useEffect(() => elementRef.current.scrollIntoView());
		return <div ref={elementRef} />;
	};

	useEffect(() => {
		if (activeChat !== null){
			socket.on("receive-message",(message) => {

				if (message.receiver === user.user.email){
					setMessages([...messages,message])
				}
			})
		}
	},[])

	const fetchMessages = async (e) => {
		try {
			const searchRes = await fetch(`${BaseURL}/chat/message/${user.user.email}/${activeChat.email}`)
			const res = await searchRes.json()
			console.log("Chat messages res",res)
			setMessages(res.messages)

		}catch (e){
			console.log('error in search users')
			console.log(e)
		}
	}

	useEffect(() => {
		if (activeChat !== null){
			fetchMessages()
			socket.emit("joinRoom",{ sender:user.user.email,receiver:activeChat.email })
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
		setMessages([...messages,{ ...message,id:Math.floor((Math.random() * 1000) + 1) }])
		setMessageText("")
		socket.emit("send-message",message)
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
								<h1 className='font-bold '>{activeChat.name}</h1>
								<div className='flex justify-evenly'>
									<AiOutlineSearch size={23} />
									<BsThreeDotsVertical size={23}/>
								</div>
							</div>
						</div>
						<div className='w-full h-full flex-1 overflow-y-scroll p-4' ref={chatBox}>
							{
								messages.map((message,index) => {
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
								/>
								<div onClick={SendMessage} className="cursor-pointer hover:bg-gray-500 rounded-2xl p-2  w-10 h-10 flex items-center justify-center">
									<IoSendSharp size={23} />
								</div>

							</div>
						</div>
					</div>

				):(
					<h1>Welcome to this Chat App</h1>
				)
			}

		</div>
	);
};

export default ChatBox;
