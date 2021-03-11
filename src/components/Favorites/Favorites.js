import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Slider,
  InputNumber,
  Row,
  Col,
} from "antd";

const { Option } = Select;

function Favorites({ visible, onCreate, onCancel, add, reqParams }) {
  const [form] = Form.useForm();

  const defaultValues = {...reqParams};

  useEffect(() => {
    form.setFieldsValue(defaultValues)
  }, [defaultValues, form])

  const [sliderValue, setSliderValue] = useState(12);


  function sliderOnChange(value) {
    setSliderValue(value);
  }

  return (
    <Modal
      visible={visible}
      title={add ? "Сохранить запрос" : "Изменить запрос"}
      okText={add ? "Сохранить" : "Изменить"}
      cancelText={add ? "Не сохранять" : "Не изменять"}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Не прошла валидация:", info);
          });
      }}
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={add ? {...defaultValues,
        maxResults: 12} : {...defaultValues}}
      >
        <Form.Item name="q" label="Запрос">
          <Input placeholder="Укажите запрос" disabled={add ? true : false} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Название"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите название!",
            },
          ]}
        >
          <Input placeholder="Укажите название" />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              name="maxResults"
              className="collection-create-form_last-form-item"
              label="Максимальное количество"
            >
              <Slider
                min={0}
                max={50}
                onChange={sliderOnChange}
                value={sliderValue}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="maxResults"
              className="collection-create-form_last-form-item"
            >
              <InputNumber
                min={0}
                max={50}
                style={{ margin: "0 16px" }}
                value={sliderValue}
                onChange={sliderOnChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="order" label="Сортировать по:">
          <Select placeholder="Без сортировки" allowClear>
            <Option value="date">Дате</Option>
            <Option value="rating">Рейтингу</Option>
            <Option value="viewCount">Числу просмотров</Option>
            <Option value="relevance">Соответствию</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Favorites;
