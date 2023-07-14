import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePuplicationDto {
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  // @IsDate() // falta colocar no formato'YYYY-MM-DD'
  @IsString()
  dateToPublish: string;

  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @IsNotEmpty()
  @IsString()
  socialMedia: string;
}
