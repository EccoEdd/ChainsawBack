import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { IDemon } from 'src/app/interfaces/idemon';
import { MatDialog } from '@angular/material/dialog';
import { FormDemonComponent } from '../form-demon/form-demon.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  
  columns: string[] = [
    'id',
    'name',
    'category',
    'options'
  ]

  dataSource: any
  demons: IDemon[] = []
  demon?: IDemon = {
    name: '',
    category: '',
    id: 1
  }
  delete: boolean = false

  @ViewChild('demonsPaginator', {static : true}) demonsPaginator: MatPaginator | undefined
  @ViewChild(MatSort, {static : true}) demonsSort: MatSort | undefined

  constructor(private route:apiRoutes, private dialog:MatDialog){ }

  ngOnInit(): void {
    this.showTable()
  }

  showTable(){
    this.route.readDemon().subscribe({
      next: (response) => {
        this.demons = response.data
        this.setData()
        //console.log(this.demons)
      },
      error: (response) => {console.log(response)},
      complete: () => {console.log('ok')}
    })
  }

  setData(){
    this.dataSource = new MatTableDataSource()
    this.dataSource.data = this.demons

    this.dataSource.paginator = this.demonsPaginator
    this.dataSource.sort = this.demonsSort
  }

  openDialogD(demon: any, stat: boolean){
    if(this.delete == false){
      let dialogRef = this.dialog.open(FormDemonComponent, { 
        width: '500px',
        data: {
          'name': demon.name, 
          'category': demon.category,
          'id': demon.id,
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

  deleteD(id: number){
    this.delete = true
    this.route.deleteDemon(id).subscribe({
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
    this.demon = row
    //console.log(this.team)
    this.openDialogD(this.demon, true)
  }
}
