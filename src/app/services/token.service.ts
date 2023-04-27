import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TokenModel } from '../models/token_model';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient: HttpClient) {

  }
  url = 'http://douglasvdev-001-site3.itempurl.com/api/Token/autenticar';

  //Headers 
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  //Chamada para obter token
  async getToken(token: TokenModel): Promise<Observable<string>> {
    return this.httpClient.post<string>(this.url, JSON.stringify(token), this.httpOptions).pipe(
      retry(2), catchError(this.handleError)
    )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = ''; if (error.error instanceof ErrorEvent) { // Erro ocorreu no lado do client 
      errorMessage = error.error.message;
    } else { // Erro ocorreu no lado do servidor 
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    } console.log(errorMessage); return throwError(errorMessage);
  };

}
