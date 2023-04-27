import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { TokenModel } from 'src/app/models/token_model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  token = { clienteId: 'abacaxi123', clienteSecret: 'segredodoabacaxi' } as TokenModel;


  constructor(private tokenService: TokenService) { }
  tokenRecebido: string;

  ngOnInit() { this.getToken(this.token), console.log(this.tokenRecebido); }

  async getToken(Token: TokenModel) { (await this.tokenService.getToken(Token)).subscribe((tokenRecebido: string) => { this.tokenRecebido = tokenRecebido; }); }

}
