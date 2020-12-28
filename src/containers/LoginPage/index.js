import React, { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Layout/UI/Input/index";
import Card from "../../components/Layout/UI/Card/index";
import Button from "../../components/Layout/UI/Button/index";
import Title from "../../components/Layout/UI/Title/index";
import Error from '../../components/Layout/UI/Error/index'
import "./style.scss";
import { signIn } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signIn(form));
  };
  if (auth.authenticated === true) {
    return <Redirect to="/" />;
  } else {
    return (
      <Layout>
        <Card>
          <form onSubmit={handleLogin} className="authForm">
            <Title>Login</Title>
            <Input
              type="email"
              label="Email"
              placeholder=""
              onChange={(value) => setForm({ ...form, email: value })}
            />
            <Input
              type="password"
              label="Password"
              placeholder=""
              onChange={(value) => setForm({ ...form, password: value })}
            />
            {
              auth.error ? <Error>{auth.error}</Error>: <></>
            }
            <Button type="submit">LOG IN</Button>
          </form>
        </Card>
      </Layout>
    );
  }
};
export default Login;
