import React from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";
import { Container, Content, Background } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Login</h1>

        <Input name="name" icon={FiUser} type="text" placeholder="Name" />
        <Input name="email" icon={FiMail} type="text" placeholder="Email" />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Register</Button>
      </form>

      <a href="create">
        <FiArrowLeft />
        Back to Login
      </a>
    </Content>
  </Container>
);

export default SignUp;
