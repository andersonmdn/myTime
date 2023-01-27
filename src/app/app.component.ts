import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  timeDifference: string;

  constructor() {
    this.form = new FormGroup({
      activity: new FormControl(''),
      activityNumber: new FormControl(''),
      estimatedTime: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      timeDifference: new FormControl(''),
    });

    this.timeDifference = '';
  }

  ngOnInit() {
    this.form = new FormGroup({
      activity: new FormControl(''),
      activityNumber: new FormControl(''),
      estimatedTime: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      timeDifference: new FormControl(''),
    });

    this.timeDifference = '';
  }

  calculateTimeDiff() {
    if (this.form.value.startTime && this.form.value.endTime) {
      let start = new Date('1970-01-01 ' + this.form.value.startTime);
      let end = new Date('1970-01-01 ' + this.form.value.endTime);
      let diff = end.getTime() - start.getTime();
      let minutes = diff / (1000 * 60);
      this.timeDifference = minutes + ' minutes';
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
