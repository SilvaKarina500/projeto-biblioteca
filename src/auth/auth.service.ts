import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginDto } from 'src/livros/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RowDataPacket } from 'mysql2';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // Nos permite utilizar as regras ditadas pelo DTO
    constructor (private readonly databaseService:DatabaseService, private readonly jwtService:JwtService){}

    async cadastrar(createUsuarioDto:CreateUsuarioDto){
        // Primeiro vamos receber os dados (nome, email e senha) passadas pela regra do DTO
        const {nome, email, senha} = createUsuarioDto;

        // Aqui estamos gerando o Hash de senha
        // O número '10' representa o número de caminhos aos quais o hash usa pra construir a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Salvamos o hash gerado, no banco de dados 
        // Não salvamos a senha original enviada pelo usuário
        await this.databaseService.query(
            `INSERT INTO usuario (nome, email, senha) VALUES (?,?,?)`, [nome, email, senhaHash]
        );

        // Este retorno é a confirmação de que a inserção dos dados no banco foi bem sucedida
        return {
            mensagem: 'Usuário cadastrado com sucesso'
        };
    }
  // Função responsável por buscar o usuário no banco através do e-mail e realizar as validações
  async login(LoginDto:LoginDto){
    // Realiza a consulta no banco buscando todos as usuarios com o email forneciudo pelo usuario
    const resultado = await this.databaseService.query(
        'SELECT * FROM usuario WHERE email = ?', [LoginDto.email]
    ) as RowDataPacket[];
    // Testamos para ver se usuário existe no banco, caso não existe, retornamos uma mensagem de 'erro'
    if (resultado.length === 0) {
        throw new UnauthorizedException('E-mail ou senha inválidos');
    }
    // Armazena o usuario encontrado dentro de constante 'usuario'
    const usuario = resultado[0];
    // Agora vamos usar o bcrypt.compare para testar se a senha informada pelo usuario
    // para realizar o login, é a mesma senha usada para o cadastro dele
    const senhaValida = await bcrypt.compare(
        LoginDto.senha, // senha do login
        usuario.senha // senha do cadastro
    );
    // Caso a senha fornecida não coincida com a senha registrada no cadastramento, retornamos
    //uma mensagem de 'erro'
    if (!senhaValida) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
    // Informações que serão armazenadas dentro do token (sendo neste caso o ID e o E-mail do
    //usuario). NÓS não passamos a senha dele pelo token por questões de segurança.
    const payload = {
        sub: usuario.id, //subject -> sujeito
        email: usuario.email // email
    };
    // Gera o Jwt utilizando o payload e a chave configurada
    const token = await this.jwtService.signAsync(payload);
    //Se tudo correu bem até aqui, o login será realizado e junto, será gerado e exibindo o token
    // Lembrando que ele tem duração de 1h
    return {
        mensagem: 'Login realizado com sucesso',
        token
    }

  }

}
