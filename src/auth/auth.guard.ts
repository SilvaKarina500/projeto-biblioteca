import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
// Essa classe irá determinar se uma requisição pode continuar ou não
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService:JwtService){}
   
    // Função resposável por identificar o tipo de requição e fornecer uma aprovação ou 
    // restrição e acesso (para a requisição)
    async canActivate(context: ExecutionContext): Promise<boolean> {
     // Recupera a requisição HTTP que está tentando acessar a rota (enviada pelo usuario)
        const request = context.switchToHttp().getRequest();
        //Recupera o contéudo do cabeçalho Authorization
        const authorization = request.headers.authorization;
      //Verificar se o token/authorization está presente no header da requisição
      if(!authorization){
        throw new UnauthorizedException('Token não informado');
      }
      // Separa o tipo (Bearer) do valor do token (a partir da propriedade authorization)
      const[tipo, token] = authorization.split(' ');

      if( tipo !== "Bearer" || !token){
        throw new UnauthorizedException('Token inválido');
      }

      try {
        // Aqui validamos a assinatura e a validade do token
        const payload = await this.jwtService.verifyAsync(token);
        // E salvamos as informações do usuario na requisição
        request.usuario = payload; //payload são dados que estão dentro do token
      } catch {
        //Case não seja válido ou não esteja dentro do prazo, exibindo uma mensagem de 'erro'
        throw new UnauthorizedException('Token inválido ou expirado');
      }
      //Se tudo estiver correto, permitimos que a requisição continue.
      return true;

    } 
        
    }
