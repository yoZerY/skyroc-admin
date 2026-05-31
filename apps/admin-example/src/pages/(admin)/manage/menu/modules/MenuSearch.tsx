import { SvgIcon } from '@skyroc/web-ui-compose';
import type { TableSearchProps } from '@skyroc/web-ui-compose';
import { Button, Col, Flex, Form, Input, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { translateOptions } from '@/utils/common';

import { enableStatusOptions, menuTypeOptions } from './shared';
import type { MenuSearchParams } from './shared';

interface MenuSearchProps {
  /** Ant Design search form instance controlled by the table hook. */
  form: TableSearchProps<MenuSearchParams>['form'];
  /** Reset search form and submitted query params. */
  reset: TableSearchProps<MenuSearchParams>['reset'];
  /** Submit search form. */
  search: TableSearchProps<MenuSearchParams>['search'];
  /** Current submitted search params used as form initial values. */
  searchParams: TableSearchProps<MenuSearchParams>['searchParams'];
}

const MenuSearch = (props: MenuSearchProps) => {
  const { form, reset, search, searchParams } = props;

  const { t } = useTranslation();

  async function handleSearch() {
    await search();
  }

  return (
    <Form form={form} initialValues={searchParams} labelCol={{ md: 7, span: 5 }}>
      <Row gutter={[16, 16]} wrap>
        <Col lg={6} md={12} span={24}>
          <Form.Item className="m-0" label={t('page.manage.menu.menuName')} name="menuName">
            <Input allowClear placeholder={t('page.manage.menu.form.menuName')} />
          </Form.Item>
        </Col>

        <Col lg={6} md={12} span={24}>
          <Form.Item className="m-0" label={t('page.manage.menu.routePath')} name="routePath">
            <Input allowClear placeholder={t('page.manage.menu.form.routePath')} />
          </Form.Item>
        </Col>

        <Col lg={6} md={12} span={24}>
          <Form.Item className="m-0" label={t('page.manage.menu.menuType')} name="menuType">
            <Select
              allowClear
              options={translateOptions(menuTypeOptions)}
              placeholder={t('page.manage.menu.form.menuType')}
            />
          </Form.Item>
        </Col>

        <Col lg={6} md={12} span={24}>
          <Form.Item className="m-0" label={t('page.manage.menu.menuStatus')} name="status">
            <Select
              allowClear
              options={translateOptions(enableStatusOptions)}
              placeholder={t('page.manage.menu.form.menuStatus')}
            />
          </Form.Item>
        </Col>

        <Col lg={24} span={24}>
          <Form.Item className="m-0">
            <Flex align="center" gap={12} justify="end">
              <Button icon={<SvgIcon icon="ic:round-refresh" />} onClick={reset}>
                {t('common.reset')}
              </Button>
              <Button ghost icon={<SvgIcon icon="ic:round-search" />} type="primary" onClick={handleSearch}>
                {t('common.search')}
              </Button>
            </Flex>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default MenuSearch;
