import { Component } from '@angular/core';
import { RouterOutlet,Router} from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet]
})

export class AppComponent {

  constructor(public api: ApiService,private router: Router) {}
  persondata={
    name:"sreejith3",
    age:"23",
  }

  title = 'frontend';
  name="sreejith";


  isAuthPage(): boolean {
    console.log("nav")
    return this.router.url === '/auth';
  }
  person:any;

  async addData()
  {
    this.api.addData(this.persondata);
  }


}

