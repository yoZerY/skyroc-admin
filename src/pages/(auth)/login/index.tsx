import { createFileRoute, useNavigate } from '@tanstack/react-router';
import z from 'zod';

import { loginModuleRecord } from '@/constants/app';
import { useInitLogin } from '@/features/auth/use-login';
import { useFormRules } from '@/features/form/use-rules';

type AccountKey = 'admin' | 'super' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  password: string;
  userName: string;
}

const INITIAL_VALUES = {
  password: '123456',
  userName: 'Soybean'
};

const Login = () => {
  const { t } = useTranslation();

  const [form] = AForm.useForm();

  const navigate = useNavigate();

  const { loading, login } = useInitLogin();

  const {
    formRules: { pwd, userName: userNameRules }
  } = useFormRules();

  const accounts: Account[] = [
    {
      key: 'super',
      label: t('page.login.pwdLogin.superAdmin'),
      password: '123456',
      userName: 'Super'
    },
    {
      key: 'admin',
      label: t('page.login.pwdLogin.admin'),
      password: '123456',
      userName: 'Admin'
    },
    {
      key: 'user',
      label: t('page.login.pwdLogin.user'),
      password: '123456',
      userName: 'User'
    }
  ];

  function goResetPwd() {
    navigate({ to: '/login/reset-pwd' });
  }

  function goRegister() {
    navigate({ to: '/login/register' });
  }

  function goCodeLogin() {
    navigate({ to: '/login/code-login' });
  }

  useKeyPress('enter', () => {
    form.submit();
  });

  console.log('22');

  return (
    <>
      <h3 className="text-18px text-primary font-medium">{t('page.login.pwdLogin.title')}</h3>
      <AForm
        className="pt-24px"
        form={form}
        initialValues={INITIAL_VALUES}
        onFinish={login}
      >
        <AForm.Item
          name="userName"
          rules={userNameRules}
        >
          <AInput size="large" />
        </AForm.Item>

        <AForm.Item
          name="password"
          rules={pwd}
        >
          <AInput.Password
            autoComplete="password"
            size="large"
          />
        </AForm.Item>
        <ASpace
          className="w-full"
          orientation="vertical"
          size={24}
        >
          <div className="flex-y-center justify-between">
            <ACheckbox>{t('page.login.pwdLogin.rememberMe')}</ACheckbox>

            <AButton
              type="text"
              onClick={goResetPwd}
            >
              {t('page.login.pwdLogin.forgetPassword')}
            </AButton>
          </div>
          <AButton
            block
            color="primary"
            htmlType="submit"
            loading={loading}
            shape="round"
            size="large"
            type="primary"
          >
            {t('common.confirm')}
          </AButton>
          <div className="flex-y-center justify-between gap-12px">
            <AButton
              block
              className="flex-1"
              onClick={goCodeLogin}
            >
              {t(loginModuleRecord['code-login']) as string}
            </AButton>
            <AButton
              block
              className="flex-1"
              onClick={goRegister}
            >
              {t(loginModuleRecord.register) as string}
            </AButton>
          </div>
          <ADivider className="!m-0 !text-14px !text-#666">{t('page.login.pwdLogin.otherAccountLogin')}</ADivider>
          <div className="flex-center gap-12px">
            {accounts.map(item => {
              return (
                <AButton
                  key={item.key}
                  type="primary"
                >
                  {item.label}
                </AButton>
              );
            })}
          </div>
        </ASpace>
      </AForm>
    </>
  );
};

const LoginSearchSchema = z.object({
  redirect: z.string().startsWith('/').optional()
});

export const Route = createFileRoute('/(auth)/login/')({
  component: Login,
  staticData: {
    constant: true
  },
  validateSearch: LoginSearchSchema
});
