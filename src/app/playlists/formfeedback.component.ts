import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'formfeedback',
  template: `
    <div class="alert" 
      *ngIf="complete>=0"
      [ngClass]="{'alert-danger':!complete,'alert-success':complete}"
      role="alert">
      <strong>{{title}}</strong> {{text}}
    </div>
  `,
  styles: []
})
export class FormfeedbackComponent implements OnInit {

  complete:any = -1;
  form=null;

  title = "Congratulation";
  text = "You complete the form correctly";

  constructor() { }

  @Input("ref")
  set getform(e){
    e.valueChanges.subscribe(data=> {
      if(!e.submitted)
        this.validate(data)
    });
    this.form=e.form.controls;
  }

  ErrorMessage={
    minlength: "Wpisany tekst ma zbyt mało znaków. ",
    maxlength: "Wpisany tekst przekracza liczbę dopuszczalnych znaków. ",
    required: "Zaznaczone pole jest wymagane. "
  }

  validate(controls){
    let text="";
    this.complete=true;

    for(let controln in this.form)
    { 
      let control = this.form[controln];
      if(!control.valid && !control.pristine)
      {
        console.log(control);
        this.complete=false;

        for(let error in control.errors)
          text+=this.ErrorMessage[error];
      }
    }
    console.log(text);
    if(text==="")
    {
      this.title="Congratulation"
      this.text="You complete the form correctly";
    }
    else 
    {
      this.title="Error";
      this.text=text;
    }

  }

  ngOnInit(){
  }

}
