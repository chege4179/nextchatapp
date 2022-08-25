import React from 'react';
import {signOut} from "next-auth/react";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {UserActions} from "../ReduxStore/UserConstants";

const UserCard = ({ user }) => {
	const dispatch = useDispatch()

	const SetActiveChat =() => {
		dispatch({
			type:UserActions.SET_ACTIVE_CHAT,
			payload:user
		})

	}
	return (
		<div className='w-full h-16 border border-black flex items-center px-2 hover:bg-gray-200' onClick={SetActiveChat}>
			<div className='w-12 h-12 relative' onClick={() => signOut()}>
				<Image src={user.imageUrl} layout='fill' className='rounded-3xl' alt={user.name} />
			</div>
			<div className=''>
				<h2>{user.email}</h2>
				<h2>{user.name}</h2>
			</div>
		</div>
	);
};

export default UserCard;
