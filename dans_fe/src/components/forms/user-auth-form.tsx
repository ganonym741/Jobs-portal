'use client';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import AutoForm from '@/components/ui/auto-form';
import { useAuthSignin } from '@/query/query/auth.query';

// import GoogleSignInButton from '../github-auth-button';

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserAuthForm = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { mutate: signIn, isPending } = useAuthSignin();

  const onSubmit = async (data: UserAuthForm) => {
    signIn(data);
  };

  return (
    <AutoForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      fieldConfig={{
        password: {
          inputProps: {
            type: 'password',
            placeholder: '••••••••',
          },
        },
        username: {
          inputProps: {
            placeholder: 'username',
          },
        },
      }}
    >
      <Button disabled={isPending} className="ml-auto w-full" type="submit">
        Continue With Email
      </Button>
    </AutoForm>
  );
}
