import React, { useRef, useCallback, useState } from "react";
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
import api from "../../services/api";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email is required")
            .email("Type a valid email"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // Password recovery
        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'The password recovery was sent.',
          description: 'Check your email to reset your new password.'
        })

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
      } finally {
        setLoading(false);
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

              <Button loading={loading} type="submit">Recovery</Button>
            </Form>

            <Link to="/">
              <FiLogIn />
              Back to Login
            </Link>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default ForgotPassword;
