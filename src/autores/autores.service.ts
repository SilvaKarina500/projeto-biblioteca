
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { CreateAutorDto } from './dto/create-autor.dto';

@Injectable()
export class AutoresService {

    constructor(
        private readonly databasService: DatabaseService
    ) {}

    // Criar autor
    async criar(createAutorDto: CreateAutorDto) {

        const { nome, nacionalidade, ano_nascimento } = createAutorDto;

        const sql = `
            INSERT INTO autor (
                nome, nacionalidade, ano_nascimento
            )
            VALUES (?, ?, ?)
        `;

        const resultado = await this.databasService.query(sql, [
            nome,
            nacionalidade,
            ano_nascimento
        ]) as ResultSetHeader;

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
}