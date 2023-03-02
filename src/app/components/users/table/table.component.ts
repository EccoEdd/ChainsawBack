import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/interfaces/user';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { FormUserComponent } from '../form-user/form-user.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  
  columns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'role',
    'active',
    'options'
  ]

  dataSource: any

  users: IUser[] = []
  user?: IUser = {
    id: 1,
    user: '',
    email: '',
    phone: '',
    password: '',
    status: true,
    role: {
      id: 1,
      role: 'f',
      description: 'unknown'
    }
  }
  delete: boolean = false

  @ViewChild('usersPaginator', {static : true}) usersPaginator: MatPaginator | undefined
  @ViewChild(MatSort, {static : true}) userSort: MatSort | undefined

  constructor(private route:apiRoutes, private dialog:MatDialog){}


  ngOnInit(): void {
    this.showTable()
  }

  showTable(){
    this.route.readUsers().subscribe({
      next: (response) => {
        this.users = response.data
        console.log(response.data)
        this.setData()
      },
      error: (response) => {console.log(response)},
      complete: () => {

      }
    })
  }

  setData(){
    this.dataSource = new MatTableDataSource()
    this.dataSource.data = this.users

    this.dataSource.paginator = this.usersPaginator
    this.dataSource.sort = this.userSort
  }


  openDialog(user: any, stat: boolean){
    if(this.delete == false){
      let dialogRef = this.dialog.open(FormUserComponent, { 
        width: '500px',
        data: {
          'name': user.name, 
          'status': user.status,
          'role_id': user.branch_id,
          'id': user.id,
          'email': user.email,
          'phone': user.phone,
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

  deleteU(id: number){
    if (id == 1)
      return
    if(!confirm('Ok'))
      return
    this.delete = true
    this.route.deleteUser(id).subscribe({
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
    this.user = row
    this.openDialog(this.user, true)
  }

}
