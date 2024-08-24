'use client';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import AutoForm from '@/components/ui/auto-form';
import { useUserCreate } from '@/query/query/user.query';
import { GENDER } from '@/query/dto/user.dto';

// import GoogleSignInButton from '../github-auth-button';

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  email: z.string(),
  birth_date: z.date(),
  gender: z.nativeEnum(GENDER),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  profile_desc: z.string().optional(),
  phone_number: z.string(),
});

export type UserRegisterForm = z.infer<typeof formSchema>;

export default function UserRegisterForm() {
  const { mutate: register, isPending } = useUserCreate();

  const onSubmit = async (data: UserRegisterForm) => {
    register(data);
  };

  return (
    <AutoForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      fieldConfig={{
        username: {
          label: 'Masukkan Username',
          inputProps: {
            placeholder: 'username',
          },
        },
        password: {
          label: 'Buat password kamu',
          inputProps: {
            type: 'password',
            placeholder: '••••••••',
          },
        },
        name: {
          label: 'Masukkan nama lengkap',
          inputProps: {
            placeholder: 'Nama',
          },
        },
        email: {
          label: 'Masukkan email valid',
          inputProps: {
            type: 'email',
            placeholder: 'example@domain.com',
          },
        },
        birth_date: {
          label: 'Masukkan tanggal lahirmu',
          inputProps: {
            type: 'date',
          },
        },
        gender: {
          label: 'Pilih jenis kelamin',
          inputProps: {
            type: 'radio',
          },
        },
        address: {
          label: 'Masukkan alamat kamu',
          inputProps: {
            placeholder: 'Jl. Kenari...',
          },
        },
        city: {
          label: 'Masukkan kota domisili',
          inputProps: {
            placeholder: 'Kotamu',
          },
        },
        province: {
          label: 'Masukkan provinsi domisili',
          inputProps: {
            placeholder: 'provinsimu',
          },
        },
        profile_desc: {
          label: 'Ceritakan tentang dirimu (*Optional)',
          inputProps: {
            type: 'text',
          },
        },
        phone_number: {
          label: 'Masukkan no telp',
          inputProps: {
            placeholder: '0821....',
          },
        },
      }}
    >
      <Button disabled={isPending} className="ml-auto w-full" type="submit">
        Registrasi
      </Button>
    </AutoForm>
  );
}
