import { TokenService } from './../../services/token.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cliente } from './../../models/cliente';
import { Component } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  cliente: Cliente;
  token: string;
  constructor(
    private tokenService: TokenService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.GetCliente('111111111111');
  }

  //Fazer o unsubscribe :D
  GetCliente(cpf: string) {
    debugger
    this.tokenService.getToken().subscribe((tokenUser) => {
      this.token = tokenUser.token;
      this.clienteService
        .getClienteByCPF(cpf, this.token)
        .subscribe((cliente: Cliente) => {
          this.cliente = cliente;
          console.log(this.cliente);
        });
    });
  }
}
