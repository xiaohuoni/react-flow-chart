import React from 'react';
import type { FC } from 'react';
import { Card, Input, Select, Form } from 'antd';
import { withPropsAPI } from 'gg-editor';

const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

type DetailFormProps = {
  type: string;
  propsAPI?: any;
};

const DetailForm: FC<DetailFormProps> = (props) => {
  const { type, propsAPI } = props;
  const item = propsAPI.getSelected()[0];
  if (!item) {
    return null;
  }
  const handleFieldChange = (values: any) => {
    const { getSelected, executeCommand, update } = propsAPI;

    setTimeout(() => {
      const item = getSelected()[0];
      if (!item) {
        return;
      }
      executeCommand(() => {
        update(item, {
          ...values,
        });
      });
    }, 0);
  };
  const handleInputBlur = (type: string) => (
    e: React.FormEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    handleFieldChange({
      [type]: e.currentTarget.value,
    });
  };

  const renderNodeDetail = () => {
    const { label } = item.getModel();

    return (
      <Form initialValues={{ label }}>
        <Item label="Label" name="label" {...inlineFormItemLayout}>
          <Input onBlur={handleInputBlur('label')} />
        </Item>
      </Form>
    );
  };

  const renderEdgeDetail = () => {
    const { label = '', shape = 'flow-smooth' } = item.getModel();

    return (
      <Form initialValues={{ label, shape }}>
        <Item label="Label" name="label" {...inlineFormItemLayout}>
          <Input onBlur={handleInputBlur('label')} />
        </Item>
        <Item label="Shape" name="shape" {...inlineFormItemLayout}>
          <Select onChange={(value) => handleFieldChange({ shape: value })}>
            <Option value="flow-smooth">Smooth</Option>
            <Option value="flow-polyline">Polyline</Option>
            <Option value="flow-polyline-round">Polyline Round</Option>
          </Select>
        </Item>
      </Form>
    );
  };

  const renderGroupDetail = () => {
    const { label = '新建分组' } = item.getModel();

    return (
      <Form initialValues={{ label }}>
        <Item label="Label" name="label" {...inlineFormItemLayout}>
          <Input onBlur={handleInputBlur('label')} />
        </Item>
      </Form>
    );
  };
  return (
    <Card type="inner" size="small" title={upperFirst(type)} bordered={false}>
      {type === 'node' && renderNodeDetail()}
      {type === 'edge' && renderEdgeDetail()}
      {type === 'group' && renderGroupDetail()}
    </Card>
  );
};
export default withPropsAPI(DetailForm as any);
