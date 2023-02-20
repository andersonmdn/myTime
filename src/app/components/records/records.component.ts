import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import * as moment from 'moment';
import { RecordsService } from 'src/app/services/record.service';

interface iActivity {
  activity: string | null;
  activityNumber: number | null;
  activityItem: number | null;
  estimatedTime: string | null;
  activityDate: string | null;
  startTime: string | null;
  endTime: string | null;
  currentActivity: boolean | null;
  timeDifference: string | null;
  timeLeft: string | null;
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {
  form: FormGroup;
  timerId: any;
  activityArray: iActivity[] = JSON.parse(localStorage.getItem('activities') || '[]');

  activityOptions: any[];

  constructor(private records: RecordsService) {
    this.activityOptions = [];

    this.form = new FormGroup({});

    this.timerId = 0;
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/activities').subscribe((data: any) => {
      this.activityOptions = data.map((activity: any) => ({
        description: activity.description,
        activityNumberEnable: activity.has_number,
        activityItemEnable: activity.has_item,
        activityDescriptionEnabled: activity.has_description,
        myTime: 0,
        estimatedTimeEnable: activity.has_estimated_time == 1,
      }))
      console.log(this.activityOptions)
    });

    this.form = new FormGroup({
      activity: new FormControl('SAI - Auxílio'),
      activityNumber: new FormControl(''),
      activityItem: new FormControl(''),
      estimatedTime: new FormControl(''),
      activityDate: new FormControl(moment().format('YYYY-MM-DD')),
      startTime: new FormControl('', [Validators.required, this.validationTimeStartEnd('start')]),
      endTime: new FormControl(
        moment().format('HH:mm'),
        [Validators.required, this.validationTimeStartEnd('end')],
      ),
      currentActivity: new FormControl(false),
      timeDifference: new FormControl(''),
      timeLeft: new FormControl(''),
    });

    console.log(moment().format('HH:mm'));

    this.updateValidators('SAI - Auxílio');

    this.form.get('activity')?.valueChanges.subscribe((activity: string) => {
      this.updateValidators(activity);
    });

    this.timerId = setInterval(() => {
      if (this.form.value.currentActivity) {
        this.form.get('endTime')?.setValue(moment().format('HH:mm'));
        this.calculateTimeDiff();
        this.calculateTimeLeft();
      }
    }, 9000);
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }

  updateValidators(activity: string) {
    let desiredOption = this.activityOptions.find((option) => option.description === activity);

    if (desiredOption) {
      if (desiredOption.activityNumberEnable > 0) {
        if ((desiredOption.activityNumberEnable = 2)) {
          this.form.get('activityNumber')?.setValidators(Validators.required);
        }
        this.form.get('activityNumber')?.enable();
      } else {
        this.form.get('activityNumber')?.clearValidators();
        this.form.get('activityNumber')?.disable();
      }

      if (desiredOption.activityItemEnable > 0) {
        if ((desiredOption.activityItemEnable = 2)) {
          this.form.get('activityItem')?.setValidators(Validators.required);
        }
        this.form.get('activityItem')?.enable();
      } else {
        this.form.get('activityItem')?.clearValidators();
        this.form.get('activityItem')?.disable();
      }

      if (desiredOption.estimatedTimeEnable) {
        this.form.get('estimatedTime')?.setValidators(Validators.required);
        this.form.get('estimatedTime')?.enable();
      } else {
        this.form.get('estimatedTime')?.clearValidators();
        this.form.get('estimatedTime')?.disable();
      }
    } else {
      this.form.get('activityNumber')?.clearValidators();
      this.form.get('activityNumber')?.disable();
      this.form.get('activityItem')?.clearValidators();
      this.form.get('activityItem')?.disable();
      this.form.get('estimatedTime')?.clearValidators();
      this.form.get('estimatedTime')?.disable();
    }

    this.form.get('activityNumber')?.updateValueAndValidity();
    this.form.get('activityItem')?.updateValueAndValidity();
    this.form.get('estimatedTime')?.updateValueAndValidity();
  }

  calculateTimeDiff() {
    if (this.form.value.startTime && this.form.getRawValue().endTime) {
      let start = new Date('1970-01-01 ' + this.form.value.startTime);
      let end = new Date('1970-01-01 ' + this.form.getRawValue().endTime);
      let diff = end.getTime() - start.getTime();
      let minutes = diff / (1000 * 60);
      this.form.get('timeDifference')?.setValue(minutes + 'min');

      this.form.get('startTime')?.updateValueAndValidity();
      this.form.get('endTime')?.updateValueAndValidity();
    }
  }

  calculateTimeLeft() {
    if (this.form.value.estimatedTime && this.form.getRawValue().timeDifference) {
      let minutesLeft = this.form.value.estimatedTime - this.form.getRawValue().timeDifference.replace(/\D/g, '');
      this.form.get('timeLeft')?.setValue(minutesLeft + 'min');
    }
  }

  changeCurrentActivity() {
    if (this.form.get('currentActivity')?.value) {
      this.form.get('endTime')?.disable();
      this.form
        .get('endTime')
        ?.setValue(moment().format("HH:mm"));
      this.calculateTimeDiff();
      this.calculateTimeLeft();
    } else {
      this.form.get('endTime')?.enable();
    }
  }

  validationTimeStartEnd(time: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let startTime = new Date('1970-01-01 ' + control.value);
      let endTime = new Date('1970-01-01 ' + control.value);

      if (time == 'start') {
        endTime = new Date('1970-01-01 ' + this.form.getRawValue().endTime);
      } else {
        startTime = new Date('1970-01-01 ' + this.form.getRawValue().startTime);
      }

      if (endTime < startTime) {
        return { validationTimeStartEnd: true };
      }

      return null;
    };
  }

  onSubmit() {
    if (this.form.valid) {
      // this.activityArray.push(this.form.value);
      // localStorage.setItem('activities', JSON.stringify(this.activityArray));

    }
  }
}
