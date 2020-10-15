// How it will manage the data from 'models'.
// It will update, list, delete, etc...

import { getRepository, Repository } from "typeorm";

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from "../entities/Appointment";
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';


class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    // Create the repository
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // const findAppointment = this.appointments.find((appointment) =>
    //   isEqual(date, appointment.date)
    // );
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;