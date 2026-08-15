import {  IsString, IsInt, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class updateAutorDto{
    // Deve ser uma string e o campo não precisa ser enviado na atualização
    //Mas caso ele seja enviado, precisará ser uma strig.
 @IsOptional()
 @IsString()
 @ApiPropertyOptional({
    example: 'Machado de Assis',
    description: 'Autor'
 })
 nome: string;

 @IsOptional()
 @IsString()
 @ApiPropertyOptional({
    example: 'Brasileiro',
    description: 'Autor'
 })
 nacionalidade?: string;
 
  // Deve ser um numero inteiro e o campo não precisa ser enviado na atualização, mas caso ele seja 
  //enviado, precisará ser um numero inteiro.
 @IsOptional()
 @IsInt()
  @ApiPropertyOptional({
    example: 1985,
    description: 'Ano de nascimento do autor'
 })
 ano_nascimento?: number;
 

}