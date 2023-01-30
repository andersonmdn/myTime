import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import * as moment from 'moment';

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
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss'],
})
export class ActivityFormComponent implements OnInit {
  form: FormGroup;
  timerId: any;
  activityArray: iActivity[] = JSON.parse(localStorage.getItem('activities') || '[]');

  activityOptions = [
    {
      description: 'Afastamento Doença',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Area Folha - Aperfeiçoamento',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 3,
      estimatedTimeEnable: false,
    },
    {
      description: 'Atualizando/Reiniciando Aplicações em PROD',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Atualizando Ambiente de Testes',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Auxílio Maternidade',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Classificando retorno de teste',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'Conferindo/Assinando Relatório Ponto',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Consulta Médica',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Contabil - Gerenciamento',
      activityNumberEnable: 2,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'DB2',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Diretrizes - Outros',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'Diretrizes - PDCA',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'Estudo para versões futuras',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'Feedback funcionários',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'Feriado',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 0,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Férias',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Folga Aniversário',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 0,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Folga banco de horas',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Folga concedida pela Empresa',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Folga Funeral',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Folga Matrimônio',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Folga Paternidade',
      activityNumberEnable: 2,
      activityItemEnable: 2,
      activityDescriptionEnabled: 1,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'Iniciando e Configurando Ferramentas de Trabalho',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Lanche',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 0,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'Merge e Deploy Liberação Versão/Arquivo',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'MyExpenses',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'MyTime - Lançar tempos',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'NE/SA',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'NE-Analisando NE',
      activityNumberEnable: 1,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'OnBalance OOB',
      activityNumberEnable: 2,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 3,
      estimatedTimeEnable: false,
    },
    {
      description: 'ONVIO',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 3,
      estimatedTimeEnable: false,
    },
    {
      description: 'ONVIO/ONBALANCE - Anomalias',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 3,
      estimatedTimeEnable: false,
    },
    {
      description: 'Outros: Emails',
      activityNumberEnable: 2,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'Outros ** Evite Usar',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'Participando de TOWN HALL',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'Pesquisa',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Pessoal',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 0,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'Phase 2 - Requirements and Planning',
      activityNumberEnable: 2,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 3,
      estimatedTimeEnable: false,
    },
    {
      description: 'Phase 3 - Design',
      activityNumberEnable: 2,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 3,
      estimatedTimeEnable: false,
    },
    {
      description: 'Phase 4 - Development',
      activityNumberEnable: 2,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 3,
      estimatedTimeEnable: false,
    },
    {
      description: 'Phase 5 - Systems Testing',
      activityNumberEnable: 2,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 3,
      estimatedTimeEnable: false,
    },
    {
      description: 'Projetos',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'PSAI - Análise',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'RA',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'RDM',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'Registrando Atividades no Registro de Atividades',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Respondendo Dúvida da Equipe',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Reunião',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'Reunião Daily/Weekly',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: true,
    },
    {
      description: 'Reuniões de Versão (EBS)',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'SAI - Análise - Reunião de diversas SAIs',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: true,
    },
    {
      description: 'SAI - Análise - Reunião de SAI especifica',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 0,
      myTime: 0,
      estimatedTimeEnable: true,
    },
    {
      description: 'SAI - Auxílio',
      activityNumberEnable: 2,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'SAI - CodeReview',
      activityNumberEnable: 2,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: true,
    },
    {
      description: 'Saída Particular',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 2,
      estimatedTimeEnable: false,
    },
    {
      description: 'SAIL-Analisando SAIL',
      activityNumberEnable: 1,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'SAI - Merge',
      activityNumberEnable: 1,
      activityItemEnable: 2,
      activityDescriptionEnabled: 0,
      myTime: 0,
      estimatedTimeEnable: true,
    },
    {
      description: 'SAI - Programação',
      activityNumberEnable: 1,
      activityItemEnable: 1,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: true,
    },
    {
      description: 'SAI - Respondendo duvidas a gerencia de produtos',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'SAI - Respondendo duvidas ao Teste',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'SAI - Retornos',
      activityNumberEnable: 2,
      activityItemEnable: 1,
      activityDescriptionEnabled: 0,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'SAL-Analisando SAL',
      activityNumberEnable: 1,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'SAM-Analisando SAM',
      activityNumberEnable: 1,
      activityItemEnable: 2,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'SCSQL',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 0,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'SQL (Auxílio)',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 0,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'SS',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 0,
      myTime: 4,
      estimatedTimeEnable: true,
    },
    {
      description: 'SS (Auxílio)',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 0,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'SSI',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'SSI (Auxílios)',
      activityNumberEnable: 1,
      activityItemEnable: 2,
      activityDescriptionEnabled: 1,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Suporte',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'Tarefas do SGD',
      activityNumberEnable: 1,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Treinamento (fornecendo)',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'Treinamento (recebendo)',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 1,
      estimatedTimeEnable: false,
    },
    {
      description: 'Utilitários',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Validando roteiros de desenvolvimento',
      activityNumberEnable: 1,
      activityItemEnable: 1,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
    {
      description: 'Versão',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 1,
      myTime: 4,
      estimatedTimeEnable: false,
    },
    {
      description: 'Versão - Auxiliando Destraves',
      activityNumberEnable: 0,
      activityItemEnable: 0,
      activityDescriptionEnabled: 2,
      myTime: 0,
      estimatedTimeEnable: false,
    },
  ];

  constructor() {
    this.form = new FormGroup({});

    this.timerId = 0;
  }

  ngOnInit() {
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
      this.activityArray.push(this.form.value);
      localStorage.setItem('activities', JSON.stringify(this.activityArray));
    }
  }
}
