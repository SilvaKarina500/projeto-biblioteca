import {  IsString, IsInt, IsNotEmpty } from "class-validator";


export class updateAutorDto{
    // Deve ser uma string e o campo não precisa ser enviado na atualização
    //Mas caso ele seja enviado, precisará ser uma strig.
 @IsNotEmpty()
 @IsString()
 nome: string;

 @IsNotEmpty()
 @IsString()
 nacionalidade?: string;
 
  // Deve ser um numero inteiro e o campo não precisa ser enviado na atualização, mas caso ele seja 
  //enviado, precisará ser um numero inteiro.
 @IsNotEmpty()
 @IsInt()
 ano_nascimento?: number;
 

}