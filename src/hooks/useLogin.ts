import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function useLogin() {
  return useMutation({
    mutationFn: (data: any) => {
      return axios.post('https://api.example.com/login', data);
    },
  });
}

export default useLogin;
