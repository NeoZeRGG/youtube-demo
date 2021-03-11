import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../../vendor/images/sibdev-logo.jpg";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import "./Login.css";

function Login({ setLoggedIn, setUser, getStore }) {
  const history = useHistory();

  let database;

  axios.get("./users.json").then((res) => (database = res.data));

  const onFinish = (values) => {
    for (let i in database.users) {
      if (
        database.users[i].name === values.username &&
        database.users[i].password === values.password
      ) {
        localStorage.setItem("token", `${database.users[i].name}abc`);
        setUser(values.username);
        getStore(values.username);
        setLoggedIn(true);
        history.push("/");
        return;
      }
    }
    console.log("Неверный логин или пароль!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div className="login">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login__form"
      >
        <img src={logo} alt="лого" className="login__logo"></img>
        <h2>Вход</h2>
        <Form.Item
          label="Логин"
          name="username"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите логин!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите пароль!!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="login__button"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
