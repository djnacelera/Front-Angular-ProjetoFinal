import { Mesa } from 'src/app/models/mesa';
import { Component } from '@angular/core';
import { Prato } from 'src/app/models/prato';
import { Pedidos } from 'src/app/models/pedidos';
import { PratoService } from 'src/app/services/prato/prato.service';
import { TokenService } from 'src/app/services/token.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { RealizarPedido } from 'src/app/models/realizar-pedido';
import { TransporteServiceService } from './../../services/transporte/transporte-service.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  token: string;
  pratos: Prato[];
  pedidos: Pedidos[];
  pedido: Pedidos;
  mesas: Mesa[];
  idMesa: string = '013ed28f-d7cf-4afc-976c-3196851ad772';
  cpf: string = '11111111111';

  realizarPedido: RealizarPedido = {
    mesaid: this.idMesa,
    pratoid: 'C41B0305-14F3-4E49-90A4-08DB3C65CB9C',
    cpf: this.cpf,
    quantidade: 4,
  };


  constructor(
    private tokenService: TokenService,
    private pratoService: PratoService,
    private pedidosService: PedidoService,
    private transporte: TransporteServiceService
  ) {}


  ngOnInit() {
     this.GetPratos();
  }

  // ngOnInit() {
  //   this.transporte.getObjeto().subscribe(obj => {
  //     this.mesas = obj;
  //   });
  // }

   RealizarPedido(){
     this.postPedido(this.realizarPedido);
  }

  postPedido(pedido: RealizarPedido){
    this.tokenService.getToken().subscribe((tokenUser) => {
      this.token = tokenUser.token;
      this.pedidosService
        .postPedido(this.realizarPedido, this.token)
        .subscribe((pedidos: Pedidos) => {
          this.pedido = pedidos;
          console.log(this.pedido);
        });
    });
  }

  GetPedidosCPfMesa() {
    this.tokenService.getToken().subscribe((tokenUser) => {
      this.token = tokenUser.token;
      this.pedidosService
        .getPedidosByMesaCPF(this.cpf, this.idMesa, this.token)
        .subscribe((pedidos: Pedidos[]) => {
          this.pedidos = pedidos;
          console.log(this.pedidos);
        });
    });
  }


  GetPratos() {
    this.tokenService.getToken().subscribe((tokenUser) => {
      this.token = tokenUser.token;
      this.pratoService.getPratos(this.token).subscribe((pratos: Prato[]) => {
            this.pratos = pratos.filter(prato=>prato.status);
        console.log(this.pratos);
      });
    });
  }

}
