import { io } from "socket.io-client"


let LocalURL = "http://localhost:9000";
let RemoteURL = "";
let BaseURL;
let socket
if (process.env.NODE_ENV !=="production"){
	socket = io(LocalURL)
	BaseURL = LocalURL
}else {
	socket = io(RemoteURL)
	BaseURL = RemoteURL
}

export { socket,BaseURL }
