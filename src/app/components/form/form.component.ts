import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PointService} from '../../service/point/point.service';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../service/language.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy{
  form: FormGroup;
  error: string | undefined;
  errorSub: Subscription | undefined;
  @Output() radius: EventEmitter<object> = new EventEmitter<object>();
  constructor(private formBuilder: FormBuilder, private httpPoint: PointService,
              private translate: TranslateService, private language: LanguageService) {
    this.form = formBuilder.group({
      xField: [null, [Validators.required, Validators.pattern('^(0$|-?[1-4](\\.\\d*[1-9]$)?|-?0\\.\\d*[1-9]|-?5)$')]],
      yField: [-3],
      rField: [1, [Validators.required, Validators.pattern('^(0$|-?[1-4](\\.\\d*[1-9]$)?|-?0\\.\\d*[1-9]|-?5)$')]]
    });
  }

  ngOnInit(): void {
    this.form.get('rField')?.valueChanges.subscribe(() => {
      this.radius.emit({r: this.form.get('rField')?.value, valid: this.form.get('rField')?.valid});
    });
    this.httpPoint.error.subscribe(error => {
      if (error.status === 400) {
        this.setError('MAIN.FORM.ERROR_RADIUS');
      }
    });
  }

  submit(): void {
    console.log(this.language.getLogMessage('LOG.SEND'));
    const xValue = this.form.get('xField')?.value;
    const yValue = this.form.get('yField')?.value;
    const rValue = this.form.get('rField')?.value;
    this.httpPoint.doPost({x: xValue, y: yValue, r: rValue});
  }

  setError(error: string): void {
    this.errorSub = this.translate.stream(error)
      .subscribe(translation => this.error = translation);
  }

  ngOnDestroy(): void {
    if (this.errorSub !== undefined) {
      this.errorSub?.unsubscribe();
    }
  }
}
