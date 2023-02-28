import { Component, OnInit, ViewChild } from '@angular/core';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ITeam } from 'src/app/interfaces/iteam';
import { MatDialog } from '@angular/material/dialog';
import { FormTeamComponent } from '../form-team/form-team.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  columns: string[] = [
    'id',
    'name',
    'status',
    'branch',
    'options'
  ]

  dataSource: any
  teams: ITeam[] = []
  team?: ITeam = {
    name:'',
    status:true,
    branch_id:1,
    id:1
  }
  delete: boolean = false
  
  @ViewChild('teamsPaginator', {static : true}) teamsPaginator: MatPaginator | undefined
  @ViewChild(MatSort, {static : true}) teamsSort: MatSort | undefined

  constructor(private route:apiRoutes, private dialog:MatDialog){}

  ngOnInit(): void {
    this.showTable()
  }

  showTable(){
    this.route.readTeams().subscribe({
      next: (response) => {
        this.teams = response.data
        this.setData()
        //console.log(this.teams)
      },
      error: (response) => {console.log(response)},
      complete: () => {console.log('ok')}
    })
  }

  setData(){
    this.dataSource = new MatTableDataSource()
    this.dataSource.data = this.teams

    this.dataSource.paginator = this.teamsPaginator
    this.dataSource.sort = this.teamsSort
  }

  openDialog(team: any, stat: boolean){
    if(this.delete == false){
      let dialogRef = this.dialog.open(FormTeamComponent, { 
        width: '500px',
        data: {
          'name': team.name, 
          'status': team.status,
          'branch_id': team.branch_id,
          'id': team.id,
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

  deleteT(id: number){
    this.delete = true
    this.route.deleteTeam(id).subscribe({
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
    this.team = row
    this.openDialog(this.team, true)
  }
}
