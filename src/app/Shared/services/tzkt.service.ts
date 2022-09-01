import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Block } from '../models/Block.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TransactionsByBlock } from '../models/TransactionsByBlock.model';

@Injectable({
  providedIn: 'root'
})
export class TzktService {

  constructor(private http: HttpClient) {}
  
  getBlocks(): Observable<Block[]> {
    return this.http.get<Block[]>(environment.tezosUrl + 'blocks');
  }

  getTransactionCountByBlock(blockLevel: number): Observable<number> {
    const params = new HttpParams()
      .set("level", blockLevel);
    return this.http.get<number>(environment.tezosUrl + 'operations/transactions/count', { params });
  }

  getTransactionByBlock(blockLevel: number): Observable<TransactionsByBlock[]> {
    const params = new HttpParams()
      .set("level", blockLevel);
    return this.http.get<TransactionsByBlock[]>(environment.tezosUrl + 'operations/transactions', { params });
  }

}
