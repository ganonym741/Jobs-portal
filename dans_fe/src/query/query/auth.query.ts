import { useMutation } from '@tanstack/react-query';

import type { UserAuthForm } from '@/components/forms/user-auth-form';
import { setLogin } from '@/lib/auth';
import Auth from '../service/auth.service';
import type { TokenDto } from '../dto/auth.dto';
import type { User } from '../dto/user.dto';

export const useAuthSignin = () => {
  return useMutation({
    mutationFn: async (form: UserAuthForm) => await Auth.signin(form),
    async onSuccess(data) {
      await setLogin({ jwt: data?.jwt as TokenDto, user: data as User });
    },
  });
};
