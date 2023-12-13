import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsDateString,
  IsUUID,
  MinLength,
  isArray,
} from 'class-validator';

@InputType()
export class CreateLessonInput {
  @MinLength(1)
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field((_type) => [ID], { defaultValue: [] })
  students: string[];
}
