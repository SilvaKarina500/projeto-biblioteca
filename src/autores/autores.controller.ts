import { Controller, Body, Post, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';
import { updateAutorDto } from './dto/update-autor.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

 @ApiTags('Autor') // Coloca uma Tag chamada "Autor"
@Controller('autores')
export class AutoresController {
    // Injetamos o AutorService com depêndencia para o controller acessar

    constructor(
        private readonly autoresService: AutoresService
    ) {}

    @Post()
     @ApiOperation({
        summary: 'Cadastrar um novo autor'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor cadastrado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description:'Não foi possível cadastrar o autor'
    })
    criar(@Body() createAutorDto: CreateAutorDto) {
        // O @Body captura os dados enviados no corpo da requisição
        // O DTO define como esses dados deverão ser validados.
        return this.autoresService.criar(createAutorDto);
    }

      // Define o endpoint GET/autores
     @Get()
     @ApiOperation({
        summary: 'Retornar todos os autores cadastrados'
    })
    @ApiResponse({
        status: 201,
        description: 'Lista de autores retornada com sucesso'
    })
    @ApiResponse({
        status: 404,
        description:'Não foi possível retornar a lista de autores'
    })
     listarTodos() {
        return this.autoresService.listarAutores();
    }
      //Define o endpoint GET/autores/:id
     @Get(':id')
     @ApiOperation({
        summary: 'Localizar autor pelo ID'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor encontrado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description:'Autor não encontrado'
    })
     buscaPorId(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.autoresService.buscaPorIdAutor(id);
    }
     // Define o endpoint PUT /autores/:id
        @Put(':id')
        @ApiOperation({
        summary: 'Atualizar autor pelo ID'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor atualizado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description:'Não foi possível atualizar o autor'
    })
        atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados:updateAutorDto){
            return this.autoresService.atualizar(id, dados);
        }
    
        @Delete(':id')
         @ApiOperation({
        summary: 'Remover um autor por ID'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor removido com sucesso'
    })
    @ApiResponse({
        status: 404,
        description:'Não foi possível remover o autor'
    })
        remover(@Param('id', ParseIntPipe) id:number){
            return this.autoresService.remover(id)
        }
    }
    
