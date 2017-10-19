import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatCheckboxModule, MatSelectModule } from '@angular/material';

import { QuestionComponent } from './question/question.component';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        QuestionComponent,
        DialogComponent
    ],
    declarations: [
        QuestionComponent,
        DialogComponent
        
        
    ],
    providers: [
        DialogService,
    ],
    entryComponents: [
        QuestionComponent,
        DialogComponent
        
    ],
})
export class DialogModule { }