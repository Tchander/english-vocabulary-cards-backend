import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  transcription?: string[] | null;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  examples?: string[] | null;
}
