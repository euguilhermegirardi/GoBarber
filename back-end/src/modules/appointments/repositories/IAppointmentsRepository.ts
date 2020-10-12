import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  // create(): Promise<Appointment>;
  findByDate(data: Date): Promise<Appointment | undefined>;
}
