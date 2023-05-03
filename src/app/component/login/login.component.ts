import { Observable, lastValueFrom, firstValueFrom, Subscription } from 'rxjs';
import { Mesa } from './../../models/mesa';
import { TokenService } from './../../services/token.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cliente } from './../../models/cliente';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tokenretorno } from 'src/app/models/tokenretorno';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  cliente: Cliente;
  token: string;
  mesa: Mesa[];
  public cpf: string;

  constructor(
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {}

  submitForm() {
    this.GetCliente(this.cpf);
    setTimeout(() => {
      if (this.mesa.length > 0) {
        alert('Parabuains, Asmuei');
      } else {
        alert('Não localizado');
      }
    }, 700);
  }

  //Fazer o unsubscribe :D
  GetCliente(cpf: string) {
    this.tokenService.getToken().subscribe((tokenUser) => {
      this.token = tokenUser.token;
      this.clienteService
        .getClienteByCPF(cpf, this.token)
        .subscribe((mesa: Mesa[]) => {
          this.mesa = mesa;
          console.log(this.mesa);
        });
    });
  }
}
