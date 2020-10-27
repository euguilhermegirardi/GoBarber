import React, { useRef, useCallback } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { useToast } from "../../hooks/toast";
import logoImg from "../../assets/logo.svg";
import { Container, Content, Background, AnimationContainer } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/api";

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  console.log(location)

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required("Password is required"),
          password_confirmation: Yup.string().oneOf([
            Yup.ref('password'), undefined],
            'Passwords must match'
          )
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if(!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token
        })

        history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Reset password error",
          description: "Something went wrong while you tried to reset your password!",
        });
      }
    },
    [addToast, history, location.search]
  );

  return (
      <Container>
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Reset Password</h1>

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="New password"
              />

              <Input
                name="password_confirmation"
                icon={FiLock}
                type="password"
                placeholder="Password confirmation"
              />

              <Button type="submit">Reset password</Button>

            </Form>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
  );
};

export default ResetPassword;
