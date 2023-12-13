import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudenInput } from './input/create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
  async getStudentById(id: string): Promise<Student> {
    return await this.studentRepository.findOneBy({ id });
  }

  async createStudent({
    firstName,
    lastName,
  }: CreateStudenInput): Promise<Student> {
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return await this.studentRepository.save(student);
  }
}
