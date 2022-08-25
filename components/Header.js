import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import Image from 'next/image'

const Header = () => {
	const { data: session } = useSession()
	return (
		<div className=' text-gray-200 shadow transition sticky top-0 z-20  w-full basis-16 flex items-center justify-center px-4 rounde-r'>
			{
				session && (
					<Image src={session.user.image} height={48} width={48}/>
				)
			}

		</div>
	);
};

export default Header;
