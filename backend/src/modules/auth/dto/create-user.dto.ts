import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Matches(/^[A-Za-zА-Яа-яЇїІіЄєҐґ]+ [A-Za-zА-Яа-яЇїІіЄєҐґ]+$/, {
    message: 'Full name must contain exactly two words',
  })
  fullName: string;

  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsString()
  @MinLength(3)
  userTag: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in format YYYY-MM-DD',
  })
  dateOfBirth?: string;

  @IsString()
  @MinLength(5)
  password: string;
}
