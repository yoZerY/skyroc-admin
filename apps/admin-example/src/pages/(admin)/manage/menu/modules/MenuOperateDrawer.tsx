import { SvgIcon } from '@skyroc/web-ui-compose';
import type { GeneralPopupOperationProps, TableDataWithIndex } from '@skyroc/web-ui-compose';
import { Button, Col, Divider, Drawer, Flex, Form, Input, InputNumber, Radio, Row, Select, Switch } from 'antd';
import type { FormRule } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLocalIcons } from '@/utils/icon';

import ButtonListEditor from './ButtonListEditor';
import QueryListEditor from './QueryListEditor';
import { createDefaultMenuFormModel, enableStatusOptions, menuIconTypeOptions, menuTypeOptions } from './shared';

type MenuTableRecord = TableDataWithIndex<Api.SystemManage.Menu>;

interface MenuOperateDrawerProps {
  /** Ant Design form instance shared with table operate hook. */
  form: GeneralPopupOperationProps<MenuTableRecord>['form'];
  /** Submit add or edit form. */
  handleSubmit: GeneralPopupOperationProps<MenuTableRecord>['handleSubmit'];
  /** Parent menu options from the current menu tree. */
  menuOptions: Common.Option<number>[];
  /** Close drawer and reset form state. */
  onClose: GeneralPopupOperationProps<MenuTableRecord>['onClose'];
  /** Whether the drawer is visible. */
  open: GeneralPopupOperationProps<MenuTableRecord>['open'];
  /** Current operation type. */
  operateType: GeneralPopupOperationProps<MenuTableRecord>['operateType'];
  /** Route path options used by active menu selection. */
  routePathOptions: Common.Option<string>[];
}

const localIconOptions = getLocalIcons().map(getLocalIconOption);

const MenuOperateDrawer = (props: MenuOperateDrawerProps) => {
  const { form, handleSubmit, menuOptions, onClose, open, operateType, routePathOptions } = props;

  const { t } = useTranslation();
  const requiredRule = createRequiredRule(t('form.required'));
  const formValues = Form.useWatch(
    values => createDefaultMenuFormModel(values as Partial<ReturnType<typeof createDefaultMenuFormModel>>),
    form
  );
  const menuType = formValues.menuType;
  const iconType = formValues.iconType;
  const parentId = formValues.parentId;
  const hideInMenu = formValues.hideInMenu;
  const isEditing = operateType === 'edit';
  const isRouteMenu = menuType === '2';
  const isLocalIcon = iconType === '2';
  const drawerTitle = getDrawerTitle();
  const parentOptions = [
    {
      label: t('route.root'),
      value: 0
    },
    ...menuOptions
  ];

  function getDrawerTitle() {
    if (isEditing) return t('page.manage.menu.editMenu');
    if (parentId) return t('page.manage.menu.addChildMenu');

    return t('page.manage.menu.addMenu');
  }

  return (
    <Drawer
      destroyOnHidden
      footer={
        <Flex justify="space-between">
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="primary" onClick={handleSubmit}>
            {t('common.confirm')}
          </Button>
        </Flex>
      }
      open={open}
      size={760}
      title={drawerTitle}
      onClose={onClose}
    >
      <Form form={form} initialValues={createDefaultMenuFormModel()} layout="vertical">
        <Row gutter={16}>
          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.menuType')} name="menuType" rules={[requiredRule]}>
              <Radio.Group disabled={isEditing} options={translateRadioOptions(menuTypeOptions, t)} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.menuStatus')} name="status" rules={[requiredRule]}>
              <Radio.Group options={translateRadioOptions(enableStatusOptions, t)} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.menuName')} name="menuName" rules={[requiredRule]}>
              <Input allowClear placeholder={t('page.manage.menu.form.menuName')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.parent')} name="parentId">
              <Select
                showSearch
                options={parentOptions}
                optionFilterProp="label"
                placeholder={t('page.manage.menu.form.parent')}
              />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.routePath')} name="routePath" rules={[requiredRule]}>
              <Input allowClear placeholder={t('page.manage.menu.form.routePath')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.routeName')} name="routeName" rules={[requiredRule]}>
              <Input allowClear placeholder={t('page.manage.menu.form.routeName')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.i18nKey')} name="i18nKey">
              <Input allowClear placeholder={t('page.manage.menu.form.i18nKey')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.order')} name="order">
              <InputNumber className="w-full" min={0} placeholder={t('page.manage.menu.form.order')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.iconTypeTitle')} name="iconType">
              <Radio.Group options={translateRadioOptions(menuIconTypeOptions, t)} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.icon')} name="icon">
              {isLocalIcon ? (
                <Select
                  allowClear
                  showSearch
                  options={localIconOptions}
                  placeholder={t('page.manage.menu.form.localIcon')}
                />
              ) : (
                <Input
                  allowClear
                  placeholder={t('page.manage.menu.form.icon')}
                  suffix={<SvgIcon className="text-icon" icon={formValues.icon} />}
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Divider plain titlePlacement="start">
          {t('page.manage.menu.routePath')}
        </Divider>

        <Row gutter={16}>
          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.href')} name="href">
              <Input allowClear placeholder={t('page.manage.menu.form.href')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.fixedIndexInTab')} name="fixedIndexInTab">
              <InputNumber className="w-full" min={0} placeholder={t('page.manage.menu.form.fixedIndexInTab')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.hideInMenu')} name="hideInMenu" valuePropName="checked">
              <Switch checkedChildren={t('common.yesOrNo.yes')} unCheckedChildren={t('common.yesOrNo.no')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.keepAlive')} name="keepAlive" valuePropName="checked">
              <Switch checkedChildren={t('common.yesOrNo.yes')} unCheckedChildren={t('common.yesOrNo.no')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.constant')} name="constant" valuePropName="checked">
              <Switch checkedChildren={t('common.yesOrNo.yes')} unCheckedChildren={t('common.yesOrNo.no')} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label={t('page.manage.menu.multiTab')} name="multiTab" valuePropName="checked">
              <Switch checkedChildren={t('common.yesOrNo.yes')} unCheckedChildren={t('common.yesOrNo.no')} />
            </Form.Item>
          </Col>

          {hideInMenu && (
            <Col span={24}>
              <Form.Item label={t('page.manage.menu.activeMenu')} name="activeMenu">
                <Select
                  allowClear
                  showSearch
                  options={routePathOptions}
                  placeholder={t('page.manage.menu.form.activeMenu')}
                />
              </Form.Item>
            </Col>
          )}
        </Row>

        {isRouteMenu && (
          <>
            <Divider plain titlePlacement="start">
              {t('page.manage.menu.query')}
            </Divider>

            <Form.List name="query">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <QueryListEditor add={add} field={field} index={index} key={field.key} remove={remove} />
                  ))}

                  {fields.length === 0 && (
                    <Button
                      block
                      icon={<SvgIcon icon="ic:round-plus" />}
                      type="dashed"
                      onClick={() => add({ key: '', value: '' })}
                    >
                      {t('common.add')}
                    </Button>
                  )}
                </>
              )}
            </Form.List>

            <Divider plain titlePlacement="start">
              {t('page.manage.menu.button')}
            </Divider>

            <Form.List name="buttons">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <ButtonListEditor add={add} field={field} index={index} key={field.key} remove={remove} />
                  ))}

                  {fields.length === 0 && (
                    <Button
                      block
                      icon={<SvgIcon icon="ic:round-plus" />}
                      type="dashed"
                      onClick={() => add({ code: '', desc: '' })}
                    >
                      {t('common.add')}
                    </Button>
                  )}
                </>
              )}
            </Form.List>
          </>
        )}
      </Form>
    </Drawer>
  );
};

export default MenuOperateDrawer;

function createRequiredRule(message: string): FormRule {
  return {
    message,
    required: true
  };
}

function getLocalIconOption(icon: string) {
  return {
    label: (
      <Flex align="center" gap={12}>
        <SvgIcon className="text-icon" localIcon={icon} />
        <span>{icon}</span>
      </Flex>
    ),
    value: icon
  };
}

function translateRadioOptions<T extends string>(
  options: Common.Option<T, I18n.I18nKey>[],
  t: (key: I18n.I18nKey) => string
) {
  return options.map(option => ({
    label: t(option.label),
    value: option.value
  }));
}
