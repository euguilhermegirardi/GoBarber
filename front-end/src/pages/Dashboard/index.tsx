import React, { useCallback, useEffect, useState, useMemo } from "react";
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Section, Appointment, Calendar } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiClock, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

interface MonthAvailabilityItem {
  day: number,
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1, // +1 to start from 1, not 0 (JavaScript)
      }
    }).then(response => {
      setMonthAvailability(response.data);
    })
  }, [currentMonth, user.id])

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

      return dates;
  }, [currentMonth, monthAvailability])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url ? user.avatar_url : "https://avatars3.githubusercontent.com/u/48716406?s=460&u=775b5cd15d0f20dc3dcc59b4a98b8d6f698d1085&v=4"} alt={user.name} />

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
          <h1>Scheduled times</h1>
          <p>
            <span>Today</span>
            <span>6th</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Upcoming Hours</strong>
            <div>
              <img src="https://avatars3.githubusercontent.com/u/48716406?s=460&u=775b5cd15d0f20dc3dcc59b4a98b8d6f698d1085&v=4" alt="dasdasd"/>
              <strong>Gira</strong>
              <span>
                <FiClock />
                08:00am
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars3.githubusercontent.com/u/48716406?s=460&u=775b5cd15d0f20dc3dcc59b4a98b8d6f698d1085&v=4" alt="dasdasd"/>
                <strong>Gira</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Afternoon</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars3.githubusercontent.com/u/48716406?s=460&u=775b5cd15d0f20dc3dcc59b4a98b8d6f698d1085&v=4" alt="dasdasd"/>
                <strong>Gira</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars3.githubusercontent.com/u/48716406?s=460&u=775b5cd15d0f20dc3dcc59b4a98b8d6f698d1085&v=4" alt="dasdasd"/>
                <strong>Gira</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6]}, ...disabledDays ]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDayChange}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
