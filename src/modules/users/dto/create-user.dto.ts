import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  private _name: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  private _email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  private _password: string;
  @IsNotEmpty()
  @IsString()
  private _avatar: string;

  constructor(
    nameParams: string,
    emailParams: string,
    passwordParams: string,
    avatarParams: string
  ) {
    this._name = nameParams;
    this._email = emailParams;
    this._password = passwordParams;
    this._avatar = avatarParams;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }
  get password(): string {
    return this._password;
  }
  set password(value: string) {
    this._password = value;
  }
  get avatar(): string {
    return this._avatar;
  }
  set avatar(value: string) {
    this._avatar = value;
  }
}
