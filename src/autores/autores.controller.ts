import { Controller, Body, Post, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';
import { updateAutorDto } from './dto/update-autor.dto';

@Controller('autores')
export class AutoresController {
    // Injetamos o AutorService com depêndencia para o controller acessar

    constructor(
        private readonly autoresService: AutoresService
    ) {}

    @Post()
    criar(@Body() createAutorDto: CreateAutorDto) {
        // O @Body captura os dados enviados no corpo da requisição
        // O DTO define como esses dados deverão ser validados.
        return this.autoresService.criar(createAutorDto);
    }

      // Define o endpoint GET/autores
     @Get()
     listarTodos() {
        return this.autoresService.listarAutores();
    }
      //Define o endpoint GET/autores/:id
     @Get(':id')
     buscaPorId(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.autoresService.buscaPorIdAutor(id);
    }
     // Define o endpoint PUT /autores/:id
        @Put(':id')
        atualizar(@Param('id') id: number, @Body() dados:updateAutorDto){
            return this.autoresService.atualizar(id, dados);
        }
    
        @Delete(':id')
        remover(@Param('id') id:number){
            return this.autoresService.remover(id)
        }
    }
    
