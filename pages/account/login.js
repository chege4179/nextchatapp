import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {useDispatch, useSelector} from "react-redux";
import {UserActions} from "../../ReduxStore/UserConstants";
import {useRouter} from "next/router";
import {SelectUser} from "../../ReduxStore/UserReducer";

const Login = () => {

	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const dispatch = useDispatch()
	const router = useRouter()
	const user = useSelector(SelectUser)
	useEffect(() => {
		if (user !== null){
			router.replace('/')
		}
	}, [router,user]);


	const LoginUser = async (e) => {
		e.preventDefault()
		const reqbody = { email,password }
		try {
			const response = await fetch(`${BaseURL}/user/login`,{
				method:'POST',
				headers:{
					'Content-Type':'application/json'
				},
				body:JSON.stringify(reqbody)
			})
			const res = await response.json()
			if (res.success){
				toast.success(res.msg)
				dispatch({
					type:UserActions.LOGIN_SUCCESS,
					payload:res.user
				})
				sessionStorage.setItem('user',JSON.stringify(res.user))
				router.push('/')
			}else {
				toast.error(res.msg)
			}
		}catch (e) {
			console.log(e)
			toast.error('Server error ocurred',)

		}


	}
	return (
		<Layout title='Login Page'>


		</Layout>
	);
};

export default Login;
