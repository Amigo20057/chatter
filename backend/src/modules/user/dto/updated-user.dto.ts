import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdatedUserDto {
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-zА-Яа-яЇїІіЄєҐґ]+ [A-Za-zА-Яа-яЇїІіЄєҐґ]+$/, {
    message: 'Full name must contain exactly two words',
  })
  fullname?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in format YYYY-MM-DD',
  })
  dateOfBirth?: string;
}
