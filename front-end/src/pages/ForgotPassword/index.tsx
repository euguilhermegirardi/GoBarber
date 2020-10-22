import React, { useRef, useCallback } from "react";
import { FiLogIn, FiMail } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { useToast } from "../../hooks/toast";
import logoImg from "../../assets/logo.svg";
import { Container, Content, Background, AnimationContainer } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email is required")
            .email("Type a valid email"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // recuperacao de senha

        // history.push("/dashboard");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // dispatch a toast
        addToast({
          type: "error",
          title: "Authentication error",
          description: "Something went wrong with the password recovery! Try again!",
        });
      }
    },
    [addToast]
  );

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Password Recovery</h1>

              <Input
                name="email"
                icon={FiMail}
                type="text"
                placeholder="Email"
              />

              <Button type="submit">Recovery</Button>
            </Form>

            <Link to="/signup">
              <FiLogIn />
              Go back to Login!
            </Link>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default ForgotPassword;
