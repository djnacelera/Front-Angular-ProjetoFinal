import { EnumStatus } from "./enum-status";
import { Mesa } from "./mesa";
import { Prato } from "./prato";

export interface Pedidos {
  id: string;
  cpf: string;
  quantidade: number;
  statusPedido: number;
  statusPedidoConvertido: any;
  dtRecebimento: Date;
  pratos: Prato;
  mesas: Mesa;
}


