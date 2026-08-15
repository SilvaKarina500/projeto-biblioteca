import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
 
export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
        example: 'Machado de Assis',
        description: 'Autor do livro'
    })
  nome: string;
 
  @IsString()
  @IsNotEmpty()
   @ApiProperty({
        example: 'Brasileiro',
        description: 'Autor do livro'
    })
  nacionalidade: string;
 
  @IsInt()
  @Min(0, { message: 'O ano não pode ser negativo' })
  @Max(2100, { message: 'O ano deve ser menor ou igual a 2100' })
   @ApiProperty({
        example: 1986,
        description: 'Ano do nascimento do autor'
    })
  ano_nascimento: number;
}