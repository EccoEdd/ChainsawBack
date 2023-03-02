import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Irole } from 'src/app/interfaces/irole';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { FormRoleComponent } from '../form-role/form-role.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  
  columns: string[] =[
    'id', 'role', 'description', 'options'
  ]
  dataSource: any
  roles: Irole[] = []
  role?: Irole = {
    id:1, role: '', description: ''
  }
  delete: boolean = false

  @ViewChild('rolesPaginator', {static : true}) rolesPaginator: MatPaginator | undefined
  @ViewChild(MatSort, {static : true}) rolesSort: MatSort | undefined

  constructor(private route:apiRoutes, private dialog:MatDialog){ }

  ngOnInit(): void {
    this.showTable()
  }

  showTable(){
    this.route.readRoles().subscribe({
      next: (response) => {
        this.roles = response.data
        this.setData()
      },
      error: (response) => {console.log(response)},
      complete: () => {console.log('ok')}
    })
  }

  setData(){
    this.dataSource = new MatTableDataSource()
    this.dataSource.data = this.roles

    this.dataSource.paginator = this.rolesPaginator
    this.dataSource.sort = this.rolesSort
  }

  openDialogR(role: any, stat: boolean){
    if(this.delete == false){
      let dialogRef = this.dialog.open(FormRoleComponent, { 
        width: '500px',
        data: {
          'role': role.role, 
          'description': role.description,
          'id': role.id,
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

  deleteR(id: number){
    if (id == 1 || id == 2)
      return
    if(!confirm('Ok'))
      return
    this.delete = true
    this.route.deleteRole(id).subscribe({
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
    if(row.id == 1 || row.id == 2)
      return
    this.role = row
    this.openDialogR(this.role, true)
  }

}
