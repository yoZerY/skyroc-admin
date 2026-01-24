# @skyroc/web-form

> Ant Design 表单增强 - Web 专用

## 📦 包信息

- **包名**: `@skyroc/web-form`
- **版本**: `1.0.0`
- **平台**: Web Only
- **依赖**:
  - `antd` - Ant Design 组件库
  - `@skyroc/core-i18n` - 国际化
  - `@skyroc/core-constants` - 正则表达式

## 🎯 职责定位

**核心职责**:
- 提供常用表单验证规则
- 国际化错误提示
- 自定义验证器

## 📐 目录结构

```
@skyroc/web-form/
├── src/
│   ├── hooks/
│   │   └── use-rules.ts        # 验证规则Hook
│   ├── validators/
│   │   └── custom.ts           # 自定义验证器
│   ├── types/
│   │   └── index.ts
│   └── index.ts
└── package.json
```

## 🔌 API 设计

```ts
export { useFormRules } from './hooks/use-rules'
export * from './validators/custom'
```

## 🔨 核心实现

### 1. useFormRules Hook

```ts
// src/hooks/use-rules.ts
import type { FormInstance, FormRule } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  REG_CODE_SIX,
  REG_EMAIL,
  REG_PHONE,
  REG_PWD,
  REG_USER_NAME
} from '@skyroc/core-constants'

export function useFormRules() {
  const { t } = useTranslation()

  // 模式规则
  const patternRules = {
    code: {
      message: t('form.code.invalid'),
      pattern: REG_CODE_SIX
    },
    email: {
      message: t('form.email.invalid'),
      pattern: REG_EMAIL
    },
    phone: {
      message: t('form.phone.invalid'),
      pattern: REG_PHONE
    },
    pwd: {
      message: t('form.pwd.invalid'),
      pattern: REG_PWD
    },
    userName: {
      message: t('form.userName.invalid'),
      pattern: REG_USER_NAME
    }
  } satisfies Record<string, FormRule>

  // 表单规则
  const formRules = {
    code: [createRequiredRule(t('form.code.required')), patternRules.code],
    email: [createRequiredRule(t('form.email.required')), patternRules.email],
    phone: [createRequiredRule(t('form.phone.required')), patternRules.phone],
    pwd: [createRequiredRule(t('form.pwd.required')), patternRules.pwd],
    userName: [createRequiredRule(t('form.userName.required')), patternRules.userName]
  } satisfies Record<string, FormRule[]>

  const defaultRequiredRule = createRequiredRule(t('form.required'))

  function createRequiredRule(message: string): FormRule {
    return { required: true, message }
  }

  // 确认密码规则
  function createConfirmPwdRule(form: FormInstance): FormRule[] {
    return [
      { required: true, message: t('form.confirmPwd.required') },
      {
        message: t('form.confirmPwd.invalid'),
        validator: (rule, value) => {
          const pwd = form.getFieldValue('password')
          if (value.trim() !== '' && value !== pwd) {
            return Promise.reject(rule.message)
          }
          return Promise.resolve()
        }
      }
    ]
  }

  return {
    createRequiredRule,
    createConfirmPwdRule,
    defaultRequiredRule,
    formRules,
    patternRules
  }
}
```

## 💡 使用示例

```tsx
import { Form, Input, Button } from 'antd'
import { useFormRules } from '@skyroc/web-form'

function LoginForm() {
  const { formRules } = useFormRules()
  const [form] = Form.useForm()

  return (
    <Form form={form}>
      <Form.Item name="userName" rules={formRules.userName}>
        <Input placeholder="用户名" />
      </Form.Item>

      <Form.Item name="password" rules={formRules.pwd}>
        <Input.Password placeholder="密码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
```

## 📝 待补充内容

- [ ] 更多验证规则
- [ ] 异步验证器
- [ ] 表单联动
- [ ] 动态表单

---

**最后更新**: 2026-01-25
