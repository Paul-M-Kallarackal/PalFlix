import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useJWT = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    const checkValidJWT = async () => {
      try {
         await axios.get('http://localhost:3000/api/v1/auth/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return token
      }
       catch (error) {
        navigate('/');
        return false;
      }
    };
  checkValidJWT();
  }, [navigate,token]);
  return token;
};


export default useJWT;
