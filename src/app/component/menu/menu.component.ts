import { Component } from '@angular/core';
import { Prato } from 'src/app/models/prato';
import { PratoService } from 'src/app/services/prato/prato.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  token: string;
  pratos: Prato[];

  constructor(
    private tokenService: TokenService,
    private pratoService: PratoService
  ) {}

  ngOnInit() {
     this.GetPratos();
  }

  GetPratos() {
    this.tokenService.getToken().subscribe((tokenUser) => {
      this.token = tokenUser.token;
      this.pratoService.getPratos(this.token).subscribe((pratos: Prato[]) => {
        this.pratos = pratos;
        console.log(this.pratos);
      });
    });
  }
}
