import { Module } from '@nestjs/common';
import { AutoresController } from './autores.controller';
import { AutoresService } from './autores.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module'; 
 
@Module({
  // Importamos o DatabaseService porque o autoresService precisará acessar o banco.
  imports: [DatabaseModule, AuthModule],
  controllers: [AutoresController],
  providers: [AutoresService]
})
export class AutoresModule {}