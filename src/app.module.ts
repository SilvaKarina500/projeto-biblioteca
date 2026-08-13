import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LivrosModule } from './livros/livros.module';
import { AutoresModule } from './autores/autores.module';



@Module({
  // Aqui serão registrados os módulos utilizados pela aplicação
  imports: [
    // Torna visivel para toda a aplicação as variáveis presentes no .env.example
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    LivrosModule,
    AutoresModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
