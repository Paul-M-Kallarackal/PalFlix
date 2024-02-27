import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import callApi from '../api_wrapper/api'
import { setUserDetails } from '../userActions';
import { Heading } from '@sparrowengg/twigs-react';
const UserGreeting = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    async function fetchData(){
        if(user==null){
            const user= await callApi('get','/userDisplayDetails');
            if(user){
                dispatch(setUserDetails(user))
            }
      }}
        fetchData();
  }, [dispatch,user]);

 

  return (
   <>   
   <Heading size="h4"
   css={{
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
   }} >Welcome {user? user.username : "Guest"}
   </Heading>
   </>
  )
}

export default UserGreeting