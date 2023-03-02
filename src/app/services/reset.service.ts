import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private appComponent: AppComponent) { }

  resetApp() {
    this.appComponent.ngOnInit();
  }
}
