import { useMutation } from '@tanstack/react-query';

import type { UserAuthForm } from '@/components/forms/user-auth-form';
import { setLogin } from '@/lib/auth';
import Auth from '../service/auth.service';

export const useAuthSignin = () => {
  return useMutation({
    mutationFn: async (form: UserAuthForm) => await Auth.signin(form),
    async onSuccess(data) {
      const {jwt, ...user} = data;

      await setLogin({jwt, user:user});
    },
  });
};
