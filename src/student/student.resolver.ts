import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { CreateStudenInput } from './input/create-student.input';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Resolver((_of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((_returns) => [StudentType])
  getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query((_returns) => StudentType)
  getStudentById(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Mutation((_returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudenInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
