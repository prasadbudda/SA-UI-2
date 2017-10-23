import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EsignApiService } from '../shared/esign-api.service';
import { IUserQuestions } from '../interfaces/IUserQuestions';
import { IQuestions } from '../interfaces/IUserQuestions';
import { HttpErrorResponse } from '@angular/common/http';
import { QuestionComponent } from './question/question.component';
import { DialogService } from './dialog.service';
import 'rxjs/Rx';

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
  selectedYear: string;


  challenges:any = {};
  

  constructor(private http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog, public dialogService : DialogService,

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

  openDlg(){
    let dialogRef = this.dialog.open(DialogOverview, {
      width: '500px',
      data: [this.challenges] 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    let headers = new Headers;
    this.dialogService
    .getChallenges(1)
    .subscribe(
      res => {
        console.log(res);
         this.challenges = res;
         this.openDlg();
    },
    err => {
        console.log(err );
    }
      
    
    );
  }
}

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverview implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public dialogService: DialogService) { 
      this.generateYears(this.startYear, this.endYear);
      this.challenges = this.data;
      this.question = 0;
    }

    years = [];
    startYear = 1960;
    endYear = 2017;
    selectedYear;
    valueIncorrect;
    qOne;
    qTwo;
    zipcodeValue;
    question;
    challenges;
    tempChallenges;

    generateYears(start, end) {
      for (let year = start; year <= end; year++) {
        this.years.push(year)
      }
      return this.years;
    };

    dialogSubmit(qid){
      if(qid == 1){
      if (this.selectedYear == 1962) {
        this.valueIncorrect = false;
        this.dialogRef.close();
      }
      else{
        this.dialogService
        .getChallenges(2)
        .subscribe(
          res => {
            console.log(res);
             this.tempChallenges = res;
             this.challenges.push(this.tempChallenges);
             this.question = 1;
        },
        err => {
            console.log(err );
        });
       
        
        this.qOne = false;
        this.valueIncorrect = true;
        this.qTwo = true;
      }
    }
    else if(qid == 2){
     alert(this.zipcodeValue);
     this.dialogRef.close();
     this.router.navigate(['/eDelivery']);
    }
    }
    
    ngOnInit(){
      this.qOne = true;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}