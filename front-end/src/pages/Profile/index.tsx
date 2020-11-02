import React, { ChangeEvent, useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import { useToast } from "../../hooks/toast";
import getValidationErrors from "../../utils/getValidationErrors";
import { Container, Content, AvatarInput } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/auth";

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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
          // returns all the errors and not only the first one.
          abortEarly: false,
        });

        await api.post("/users", data);

        history.push("/");

        addToast({
          type: "success",
          title: "Registration Performed!",
          description: "Now you can login on GoBarber!",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // dispatch a toast
        addToast({
          type: "error",
          title: "Registration error",
          description: "Something went wrong with the registration!",
        });
      }
    },
    [addToast, history]
  );

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then(response => {
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar updated!'
        })
      });
      // console.log(e.target.files[0]);
    }
  }, [addToast, updateUser])

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}>
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name}/>
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>

            </AvatarInput>

            <h1>Profile</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Name" />
            <Input name="email" icon={FiMail} type="text" placeholder="Email" />

            <Input
              containerStyle={{ marginTop: '24px' }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Current password"
            />

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
              placeholder="Confirm password"
            />

            <Button type="submit">Confirm all changes</Button>
          </Form>
      </Content>
    </Container>
  );
};

export default Profile;
