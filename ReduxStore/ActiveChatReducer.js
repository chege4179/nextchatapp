import {UserActions} from "./UserConstants";


const ActiveChatReducer = (state = { activeChat:null },action) => {
	switch (action.type){
		case UserActions.SET_ACTIVE_CHAT:
			return {
				activeChat: action.payload
			}
		default:
			return state
	}
}
export const SelectActiveChat = state => state.activeChat.activeChat

export default ActiveChatReducer
