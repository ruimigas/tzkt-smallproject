import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  blockLevel?: number;
  constructor() { }

  setBlockLevel(blockLevel: number){
  this.blockLevel = blockLevel;
  }

  getBlockLevel(){
  return this.blockLevel;
  }

}
