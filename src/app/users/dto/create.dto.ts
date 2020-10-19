import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string
}