import { Inject, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [DatabaseModule,
    // Irá configurar o módulo JWT utilizando as informações que somente estarão disponíveis
    // quandoa aplicação iniciar.
  JwtModule.registerAsync({
    // Para configurrarmos p JWT, precisamos acessar as variáveis do .ENV
    // Fazemos isso através do ConfigService
    inject:[ ConfigService],
    // useFactory é a função responsável por fazer/montar a configuração do JWT
    useFactory: (ConfigService:ConfigService) => ({
      //// Busca a chave de segurança que colocamos no .ENV para gerar a Token
      secret: ConfigService.get<string>('JWT_SECRET'),
      // Define que os tokens gerados terão duração de apenas 1h (podemos alterar se quisermos)
      SignOptions: {
        expiresIn: '1h'
      }
    })
  })
],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule, AuthGuard]
})
export class AuthModule {}
