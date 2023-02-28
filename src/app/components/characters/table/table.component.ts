import { Component, OnInit, ViewChild } from '@angular/core';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ICharacter } from 'src/app/interfaces/icharacter';
import { MatDialog } from '@angular/material/dialog';
import { FormTeamComponent } from '../../teams/form-team/form-team.component';
import { FormCharacterComponent } from '../form-character/form-character.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  columns: string[] = [
    'id',
    'name',
    'l_name',
    'type',
    'alive',
    'age',
    'team',
    'options'
  ]

  dataSource: any
  characters: ICharacter[] = []
  character?: ICharacter = {
    name:'',
    l_name:'',
    type:'',
    alive: true,
    age:20,
    team_id: 1
  }
  delete: boolean = false

  @ViewChild('charactersPaginator', {static : true}) charactersPaginator: MatPaginator | undefined
  @ViewChild(MatSort, {static : true}) charactersSort: MatSort | undefined

  constructor(private route: apiRoutes, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.showTable()
  }

  showTable(){
    this.route.readCharacters().subscribe({
      next: (response) => {
        this.characters = response.data
        this.setData()
        //console.log(this.characters)
      },
      error: (response) => {console.log(response)},
      complete: () => {console.log('ok')}
    })
  }

  setData(){
    this.dataSource = new MatTableDataSource()
    this.dataSource.data = this.characters

    this.dataSource.paginator = this.charactersPaginator
    this.dataSource.sort = this.charactersSort
  }

  openDialogC(character: any, stat: boolean){
    if(this.delete == false){
      let dialogRef = this.dialog.open(FormCharacterComponent, { 
        width: '500px',
        data: {
          'id': character.id,
          'name': character.name,
          'l_name': character.l_name,
          'type': character.type, 
          'alive': character.alive,
          'age': character.age,
          'team_id': character.team_id,
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
  deleteC(id: number){
    this.delete = true
    this.route.deleteCharacters(id).subscribe({
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
    this.character = row
    //console.log(this.team)
    this.openDialogC(this.character, true)
  }
}
