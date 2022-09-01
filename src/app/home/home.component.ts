import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BlockWithTransactionCount } from '../Shared/models/Block.model';
import { SharedDataService } from '../Shared/services/shared-data.service';
import { TzktService } from '../Shared/services/tzkt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = true;
  displayedColumns: string[] = ['level', 'timestamp', 'transactionNumber'];
  dataSource = new MatTableDataSource<BlockWithTransactionCount>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    private tzktService: TzktService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) { }

  ngOnInit() {
   this.getBlocksInfo();
  }

  ngAfterViewInit() {
    if(this.sort && this.paginator){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }else {
      console.log("Paginator and sort not initialized")
    }
  }

  getBlocksInfo() {
    this.tzktService.getBlocks().subscribe((blocksInfo) => {
      // Set blocks info into data table source
      this.dataSource.data = blocksInfo;
      this.dataSource.data.forEach(item => {
        this.tzktService.getTransactionCountByBlock(item.level).subscribe((transactionNumber) => {
          // Set transaction number for each item in data table source
          item.transactionNumber = transactionNumber;
        });
      });
      setTimeout(() => {
        this.isLoading = false;
      },
        1000);
     })
  }
  
  setBlockLevel(blockLevel: number){
    this.sharedDataService.setBlockLevel(blockLevel);
    this.router.navigateByUrl('details', {replaceUrl: true});
  }
}
