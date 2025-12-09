declare namespace I18n {
  type FormMsg = {
    invalid: string;
    required: string;
  };

  type Form = {
    code: FormMsg;
    confirmPwd: FormMsg;
    email: FormMsg;
    phone: FormMsg;
    pwd: FormMsg;
    required: string;
    userName: FormMsg;
  };
}
