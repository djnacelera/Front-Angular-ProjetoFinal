import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { TokenModel } from 'src/app/models/token_model';
import { Tokenretorno } from 'src/app/models/tokenretorno';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private tokenService: TokenService) {}
  tokenRecebido: Tokenretorno;

  ngOnInit() {

  }


  async getToken() {
    (await this.tokenService.getToken()).subscribe(
      (tokenRecebido: Tokenretorno) => {
        this.tokenRecebido = tokenRecebido;
      }
    );
  }
}
