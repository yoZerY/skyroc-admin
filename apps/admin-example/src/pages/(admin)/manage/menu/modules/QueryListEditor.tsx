import { SvgIcon } from '@skyroc/web-ui-compose';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import type { FormListFieldData, FormListOperation } from 'antd';
import { useTranslation } from 'react-i18next';

interface QueryListEditorProps {
  /** Add a new query row near the current item. */
  add: FormListOperation['add'];
  /** Ant Design list field metadata for the current query row. */
  field: FormListFieldData;
  /** Current row index in the form list. */
  index: number;
  /** Remove a query row from the form list. */
  remove: FormListOperation['remove'];
}

const QueryListEditor = (props: QueryListEditorProps) => {
  const { add, field, index, remove } = props;

  const { t } = useTranslation();

  function handleAdd() {
    add({ key: '', value: '' }, index + 1);
  }

  function handleRemove() {
    remove(index);
  }

  return (
    <Row gutter={8} key={field.key}>
      <Col span={10}>
        <Form.Item name={[field.name, 'key']}>
          <Input allowClear placeholder={t('page.manage.menu.form.queryKey')} />
        </Form.Item>
      </Col>

      <Col span={10}>
        <Form.Item name={[field.name, 'value']}>
          <Input allowClear placeholder={t('page.manage.menu.form.queryValue')} />
        </Form.Item>
      </Col>

      <Col span={4}>
        <Space>
          <Button icon={<SvgIcon icon="ic:round-plus" />} onClick={handleAdd} />
          <Button icon={<SvgIcon icon="ic:round-remove" />} onClick={handleRemove} />
        </Space>
      </Col>
    </Row>
  );
};

export default QueryListEditor;
