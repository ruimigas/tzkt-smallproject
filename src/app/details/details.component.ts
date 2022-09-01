import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsByBlock } from '../Shared/models/TransactionsByBlock.model';
import { SharedDataService } from '../Shared/services/shared-data.service';
import { TzktService } from '../Shared/services/tzkt.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isLoading = true;
  blockLevel?:number;
  displayedColumns: string[] = ['sender', 'target', 'amount', 'status'];
  dataSource = new MatTableDataSource<TransactionsByBlock>();

  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    private sharedDataService: SharedDataService,
    private tzktService: TzktService
    ) { }

  ngOnInit() {
    this.blockLevel = this.sharedDataService.getBlockLevel();
    if(this.blockLevel){
      this.tzktService.getTransactionByBlock(this.blockLevel).subscribe((transactionsInfo) => {
      this.dataSource.data = transactionsInfo;
    });
    this.isLoading = false;
    }
     else {
      console.log("0 transactions in this block");
    }
  }

  ngAfterViewInit() {
    if(this.sort){
      this.dataSource.sort = this.sort;
    }else {
      console.log("Paginator and sort not initialized")
    }
  }
  

}
