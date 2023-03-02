import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBranch } from 'src/app/interfaces/ibranch';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { FormBranchComponent } from '../form-branch/form-branch.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  columns: string[] = [
    'id',
    'name',
    'location',
    'options'
  ]

  dataSource: any
  branches: IBranch[] = []
  branch?: IBranch = {
    name:'',
    location:'',
    id:1
  }
  delete: boolean = false

  @ViewChild('branchesPaginator', {static : true}) branchesPaginator: MatPaginator | undefined
  @ViewChild(MatSort, {static : true}) branchesSort: MatSort | undefined
  
  constructor(private route:apiRoutes, private dialog:MatDialog){ }
  
  ngOnInit(): void {
    this.showTable()
  }

  showTable(){
    this.route.readBranches().subscribe({
      next: (response) => {
        this.branches = response.data
        this.setData()
        console.log(this.branches)
      },
      error: (response) => {console.log(response)},
      complete: () => {console.log('ok')}
    })
  }
  
  setData(){
    this.dataSource = new MatTableDataSource()
    this.dataSource.data = this.branches

    this.dataSource.paginator = this.branchesPaginator
    this.dataSource.sort = this.branchesSort
  }

  openDialogB(branch: any, stat: boolean){
    if(this.delete == false){
      let dialogRef = this.dialog.open(FormBranchComponent, { 
        width: '500px',
        data: {
          'name': branch.name, 
          'location': branch.location,
          'id': branch.id,
          'update': stat
        }
      })
      dialogRef.afterClosed().subscribe(
        res => {
          this.ngOnInit()
        }
      )
    }
  }

  deleteB(id: number){
    if(!confirm('Ok'))
      return
    this.delete = true
    this.route.deleteBranch(id).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (response) => {
        console.log(response)
      },
      complete: () => {
        this.ngOnInit()
        this.delete = false
      }
    })
  }

  rowClick(row:any){
    this.branch = row
    //console.log(this.team)
    this.openDialogB(this.branch, true)
  }
}
