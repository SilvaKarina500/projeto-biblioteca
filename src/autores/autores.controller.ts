import { Controller, Body, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';

@Controller('autores')
export class AutoresController {

    constructor(
        private readonly autoresService: AutoresService
    ) {}

    @Post()
    criar(@Body() createAutorDto: CreateAutorDto) {
        return this.autoresService.criar(createAutorDto);
    }

    // GET /autores
    @Get()
    listarTodos() {
        return this.autoresService.listarAutores();
    }

    // GET /autores/:id
    @Get(':id')
    buscaPorId(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.autoresService.buscaPorIdAutor(id);
    }
}