import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useFormRules } from '@/features/form/use-rules';

type FormValues = {
  code: string;
  phone: string;
};

const CodeLogin = () => {
  const [form] = AForm.useForm<FormValues>();

  const { getCaptcha, isCounting, label, loading } = useCaptcha();

  const { t } = useTranslation();

  const { formRules } = useFormRules();

  const navigate = useNavigate();

  function handleSubmit(params: FormValues) {
    console.log(params);

    // request to reset password
    showSuccessMessage(t('page.login.common.validateSuccess'));
  }

  function sendCaptcha() {
    getCaptcha('17260711111');
  }

  function navigateUp() {
    navigate({ to: '..' });
  }

  useKeyPress('enter', () => {
    form.submit();
  });

  return (
    <>
      <h3 className="text-18px text-primary font-medium">{t('page.login.codeLogin.title')}</h3>
      <AForm
        className="pt-24px"
        form={form}
        onFinish={handleSubmit}
      >
        <AForm.Item
          name="phone"
          rules={formRules.phone}
        >
          <AInput placeholder={t('page.login.common.phonePlaceholder')} />
        </AForm.Item>

        <AForm.Item
          name="code"
          rules={formRules.code}
        >
          <div className="w-full flex-y-center gap-16px">
            <AInput placeholder={t('page.login.common.codePlaceholder')} />
            <AButton
              disabled={isCounting}
              loading={loading}
              size="large"
              onClick={sendCaptcha}
            >
              {label}
            </AButton>
          </div>
        </AForm.Item>
        <ASpace
          className="w-full"
          orientation="vertical"
          size={18}
        >
          <AButton
            block
            htmlType="submit"
            shape="round"
            size="large"
            type="primary"
          >
            {t('common.confirm')}
          </AButton>

          <AButton
            block
            shape="round"
            size="large"
            onClick={navigateUp}
          >
            {t('page.login.common.back')}
          </AButton>
        </ASpace>
      </AForm>
    </>
  );
};

export const Route = createFileRoute('/(auth)/login/code-login')({
  component: CodeLogin
});
