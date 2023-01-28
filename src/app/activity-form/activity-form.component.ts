import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss'],
})
export class ActivityFormComponent implements OnInit {
  form: FormGroup;
  timeDifference: string;
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
      activityNumberEnable: 1,
      activityItemEnable: 0,
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
      activityItem: new FormControl(''),
      estimatedTime: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      timeDifference: new FormControl(''),
    });

    this.timeDifference = '';

    this.form.get('activity')?.valueChanges.subscribe((activity: string) => {
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
    });
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
