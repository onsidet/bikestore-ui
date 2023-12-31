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
  id!: number;
  constructor(
    private http : HttpClient,
    private fb : FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.onInit();
    this.onGet();
  }
  edit(id: number){
    this.id = id;
    if (id){
      this.http.get(`https://localhost:9191/api/Category/${id}`).subscribe({
        next: (res: any) => {
          this.frm.setValue({
            name: res.data.name
          })
        }
      })
    }

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
  onSubmit(edit: boolean = false){
    if (!edit){
      this.http.post("https://localhost:9191/api/Category",this.frm.value).subscribe({
        next: () => {this.onGet()},
        error: error => console.log(error)
      })
    }else {
      this.http.put(`https://localhost:9191/api/Category/${this.id}`,{...this.frm.value,id: this.id}).subscribe({
        next: () => {this.onGet()},
        error: error => console.log(error)
      })
    }

  }

}
