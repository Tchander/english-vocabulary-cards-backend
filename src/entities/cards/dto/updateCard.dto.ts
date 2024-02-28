import { IsNotEmpty, IsString } from 'class-validator'; 

export class UpdateCardDto {
  @IsNotEmpty()
  @IsString()
  label: string;
}