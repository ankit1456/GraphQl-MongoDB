import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonInput } from './input/lesson.input';
import { v4 as uuid } from 'uuid';
import { AssignStudentsToLessonInput } from './input/assignStudentsToLesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons() {
    return await this.lessonRepository.find();
  }
  async getLessonById(id: string) {
    return await this.lessonRepository.findOneBy({ id });
  }

  async createLesson({
    name,
    startDate,
    endDate,
    students,
  }: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    await this.lessonRepository.save(lesson);
    return lesson;
  }

  async assignStudentsToLesson({
    lessonId,
    studentIds,
  }: AssignStudentsToLessonInput): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });

    lesson.students = [...lesson.students, ...studentIds];

    return await this.lessonRepository.save(lesson);
  }
}
