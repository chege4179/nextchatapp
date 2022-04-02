
import Layout from "../components/Layout";
import { useSession, signIn, signOut } from "next-auth/react"
import ChatScreen from "../components/ChatScreen";
import {useEffect} from "react";


export default function Home() {
     const { data: session } = useSession()

     useEffect( () => {

     },[session])


     return(
          <Layout>
               <div className='w-full h-full flex items-center justify-center flex-col'>
                    {
                         session ? (
                              <ChatScreen/>
                         ):(
                              <button
                                   className='whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline'
                                   onClick={() => signIn()}>
                                   Login With Google
                              </button>

                         )
                    }
               </div>
          </Layout>

     )
}
