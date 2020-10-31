import React from "react";

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Calendar } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiClock, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  console.log(user)

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Welcome, </span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horarios agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Atend a seguir</strong>
            <div>
              <img src="https://avatars3.githubusercontent.com/u/48716406?s=460&u=775b5cd15d0f20dc3dcc59b4a98b8d6f698d1085&v=4" alt="dasdasd"/>
              <strong>Gira</strong>
              <span>
                <FiClock />
                08:00am
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
