import { IsBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateLivroDto {
    @IsString() // tem que ser string
    @IsNotEmpty() //não pode ser estar vazio
    titulo: string;
    @IsString()
    @IsNotEmpty()
    autor: string;
    @IsInt() // tem que ser numero inteiro
    @Max(2100, {message: 'O ano deve ser menor ou igual a 2100'}) // valor maximo
    ano: number;
    @IsBoolean() // o valor é boleano
    disponivel: boolean;
}