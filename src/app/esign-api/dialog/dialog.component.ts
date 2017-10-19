import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EsignApiService } from '../shared/esign-api.service';
import { IUserQuestions } from '../interfaces/IUserQuestions';
import { IQuestions } from '../interfaces/IUserQuestions';
import { HttpErrorResponse } from '@angular/common/http';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
  private esignAPIUrl;
  private guid;
  private lineOfBusiness;
  private appName;
  public title: string;
  public message: string;
  public valueIncorrect = false;
  // public questions:any[] = [];
  status: string;
  questions;
  years = [];
  startYear = 1960;
  endYear = 2017;
  selectedValue: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog,

    private apiService: EsignApiService
  ) {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.guid = params['guid'];
      this.lineOfBusiness = params['lob'];
      this.appName = params['appName'];
    });
    this.esignAPIUrl = this.apiService.getESignAPIUrl();

  }

  getQuestions() {
    /*  const headers = new HttpHeaders().append('LOB', this.lineOfBusiness)
      .append('applicationName', this.appName)
      const url = `${this.esignAPIUrl}/${this.guid}/questions`;
        return this.http.get<IUserQuestions>(url, {headers: headers}).subscribe( data => {
          this.questions = data;
          this.status = "success";
         },
         (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
          this.status = err.error;
        }
        );
        */

    this.questions = {
      esignHeader: {
        transactionLogId: "Id",
        responseStatus: "success",
        applicationName: "Esign",
        authenticationToken: "token",
      },
      transactionLogId: "String",
      responseStatus: "success",
      applicationName: "ESign",
      authenticationToken: "token",
      question: [{
        id: 1,
        question: "In what year were you born?",
        answer: "1952"
      },
      {
        id: 2,
        question: "what is the ZIP Code where you e?",
        answer: "35801"
      }]
    };

  }

  generateYears(start, end) {
    for (let year = start; year <= end; year++) {
      this.years.push(year)
    }
    return this.years;
  }

  dialogSubmit(value) {
    if (value == false) {
      this.valueIncorrect = true;

    }
  }

  ngOnInit() {
    let headers = new Headers;
    this.getQuestions();
    this.generateYears(this.startYear, this.endYear);
    if (this.status = "success") {
      let dialogRef = this.dialog.open(DialogOverview, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    else {
      alert("msg");
    }
  }

}
@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog.component.html',
})
export class DialogOverview {

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
