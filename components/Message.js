import React from 'react';

const MyMessage = ({ message ,imageUrl }) => {
	return (
		<div className="chat-message m-4">
			<div className="flex items-end justify-end">
				<div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
					<div>
						<span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
							{message.message}</span>
					</div>
				</div>
				<img src={imageUrl}
					alt="My profile" className="w-6 h-6 rounded-full order-2"/>
			</div>
		</div>

	);
};
const ReceiverMessage = ({ message,imageUrl }) => {
	return (
		<div className="chat-message m-4">
			<div className="flex items-end">
				<div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
					<div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">{message.message}</span>
					</div>

				</div>
				<img src={imageUrl} alt="My profile" className="w-6 h-6 rounded-full order-1"/>
			</div>
		</div>
	)
}
export { MyMessage,ReceiverMessage };

