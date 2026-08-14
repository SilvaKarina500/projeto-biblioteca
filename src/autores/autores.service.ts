
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { updateAutorDto } from './dto/update-autor.dto';

@Injectable()
export class AutoresService {
    // Injetamos o DatabaseService dentro do AutorService,
    //Assim não precisamos criar manualmente uma instância de outra classe

    constructor(
        private readonly databasService: DatabaseService
    ) {}

    // Criar autor
    async criar(createAutorDto: CreateAutorDto) {
        // Aqui estamos desestruturando o DTO para que a gente receba os valores

        const { nome, nacionalidade, ano_nascimento } = createAutorDto;
     // O comando SQL que fará a inserção das informações no nossso banco de dados
        const sql = `
            INSERT INTO autor (
                nome, nacionalidade, ano_nascimento
            )
            VALUES (?, ?, ?)
        `;
        // Executa o INSERT e informa para nós o tipo esperado do resultado

        const resultado = await this.databasService.query(sql, [
            nome,
            nacionalidade,
            ano_nascimento
        ]) as ResultSetHeader;
        // Retorna uma resposta mais amigável para o usuário de confirmação
        return {
            mensagem: 'Autor cadastrado com sucesso',
            autor: {
                id: resultado.insertId,
                nome,
                nacionalidade,
                ano_nascimento
            }
        };
    }

    // Listar todos os autores
    async listarAutores() {

        const resultado = await this.databasService.query(
            'SELECT * FROM autor'
        );

        return resultado;
    }

    // Buscar autor pelo ID
    async buscaPorIdAutor(id: number) {

        const resultado = await this.databasService.query(
            'SELECT * FROM autor WHERE id = ?',
            [id]
        ) as RowDataPacket[];

        if (resultado.length === 0) {
            throw new NotFoundException(
                'Autor não encontrado'
            );
        }

        return resultado[0];
    }
     //Essa função será responsavel por realizar a atualização dos autores já cadastrados no banco de dados.
        async atualizar(id: number, dados: updateAutorDto){
            //Antes de realizar a atualização buscamos o autor pelo ID.
            //Caso o autor não exista, o método 'buscarPorId' já lança a exeção NotFound
            await this.buscaPorIdAutor(id);
    
            await this.databasService.query(
                'UPDATE autor SET  nome = ?, nacionalidade = ?, ano_nascimento = ? WHERE id = ?',
                //Os valores são substituidos nos '?' na mesma ordem em que aparecem no comando SQL.
                // O 'id' não precisa dos dados, pois e ele quem localiza o autor que será editado.
                [dados.nome, dados.nacionalidade, dados.ano_nascimento, id]
            );
            // Se a atualização foi bem sucedida, o usuário visualizará a mensagem
            return{
                mensagem: 'Autor atualizado com sucesso'
            };
        }
        // Função responsável por deletar um autor cadastrado no banco de dados
        async remover(id: number){
    
            //Antes de realizar a exclusão, buscamos o autor pelo ID.
            // Caso não seja encontrado, a função 'buscarPorId' já exibe a exceção NotFound
            await this.buscaPorIdAutor(id);
            //Executa o comando SQL de deleção.
            await this.databasService.query(
                'DELETE FROM autor WHERE id = ?', [id]
            );
            //Localizado o ID, feita a exclusão do banco, o usuário visualizará a confirmação
            return {
                mensagem: 'Autor excluido com sucesso'
            };
    
    
        }
    
       
    
    }
     
