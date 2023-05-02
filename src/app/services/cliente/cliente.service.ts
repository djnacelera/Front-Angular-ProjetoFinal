import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError, retry, catchError, map } from 'rxjs';

import { Cliente } from 'src/app/models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  //Injetando Cliente para requisição e serviço de Token para as requisições.
  constructor(private httpClient: HttpClient) {}

  //Url da API
  url = 'https://localhost:7198/api/Cliente/';

  getClienteByCPF(cpf: string, token: string): Observable<Cliente> {
    debugger
    return this.httpClient
      .get<Cliente>(`${this.url}FiltrarPorCpf/${cpf}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  //Manuseio de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
