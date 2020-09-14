import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import getValidationErrors from "../../utils/getValidationErrors";
import logoImg from "../../assets/logo.svg";
import { Container, Content, Background } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  console.log(formRef);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .required("Email is required")
          .email("Type a valid email"),
        password: Yup.string().min(6, "At least 6 characters"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>

        <a href="create">
          <FiArrowLeft />
          Back to Login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
