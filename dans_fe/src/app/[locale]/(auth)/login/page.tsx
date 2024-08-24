import { useTranslations } from 'next-intl';

import UserAuthForm from '@/components/forms/user-auth-form';

export default function AuthenticationPage() {
  const t = useTranslations('Auth');

  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t('login')}
          </h1>
          <p className="text-sm text-muted-foreground">{t('login-desc')}</p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}
