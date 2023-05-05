import { TransporteServiceService } from './../../services/transporte/transporte-service.service';
import { Mesa } from 'src/app/models/mesa';
import { Observable, lastValueFrom, firstValueFrom, Subscription } from 'rxjs';
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
  token: string;
  mesas: Mesa[];
  public cpf: string;
  logado: boolean = false;

  constructor(
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private transporte: TransporteServiceService
  ) {}

  ngOnInit() {

  }

  enviarObjeto() {
    this.transporte.setObjeto(this.mesas);
  }

  submitForm() {
      this.GetCliente(this.cpf);
      setTimeout(() => {
        if (this.mesas.length > 0) {
          alert('Parabuains, Asmuei');
          this.enviarObjeto();
        this.logado = true;
      } else {
        alert('Não localizado');
        this.logado = false;
      }
    }, 500);
  }

  //Fazer o unsubscribe :D
  GetCliente(cpf: string) {
    this.tokenService.getToken().subscribe((tokenUser) => {
      this.token = tokenUser.token;
      this.clienteService
        .getClienteByCPF(cpf, this.token)
        .subscribe((mesa: Mesa[]) => {
          this.mesas = mesa;
          console.log(this.mesas);
        });
    });
  }
}
