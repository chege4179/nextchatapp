
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import UserReducer from "./UserReducer";
import ThemeReducer from "./ThemeReducer";
import ActiveChatReducer from "./ActiveChatReducer";

const middleware = [thunk];

const AppReducer = combineReducers({
    user:UserReducer,
    theme:ThemeReducer,
    activeChat:ActiveChatReducer

})
const store = createStore(AppReducer,composeWithDevTools(applyMiddleware(...middleware)));
export default store;
