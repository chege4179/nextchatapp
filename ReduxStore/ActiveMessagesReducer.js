import {UserActions} from "./UserConstants";

const ActiveMessagesReducer = (state = { activeMessages:[] },action) => {
	switch (action.type){
		case UserActions.SET_ACTIVE_MESSAGES:
			return {
				activeMessages: action.payload
			}
		case UserActions.REMOVE_ACTIVE_MESSAGES:
			return {
				activeMessages: []
			}
		case UserActions.ADD_MESSAGE:
			console.log("Payload message",action.payload)
			return {
				activeMessages: [...state.activeMessages,action.payload]
			}
		default:
			return state
	}
}
export const SelectMessages = state => state.activeMessages.activeMessages

export default ActiveMessagesReducer
