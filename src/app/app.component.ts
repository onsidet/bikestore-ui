import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bikestore-ui';
  lists: any[] = [];
  frm!: FormGroup;
  constructor(
    private http : HttpClient,
    private fb : FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.onInit();
    this.onGet();
  }

  onGet(){
    this.http.get('https://localhost:9191/api/Category/GetAll')
      .subscribe({
        next: (response:any) => {
          this.lists = response.data
        },
        error: error => console.log(error)
      })
  }

  onInit(){
    this.frm = this.fb.group({
      name: [null]
    })
  }
  onSubmit(){
    this.http.post("https://localhost:9191/api/Category",this.frm.value).subscribe({
      next: () => {this.onGet()},
      error: error => console.log(error)
    })
  }

}
