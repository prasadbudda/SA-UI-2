import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatInputModule } from '@angular/material';

import { QuestionComponent } from './question/question.component';
import { DialogComponent, DialogOverview } from './dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        QuestionComponent,
        DialogComponent
    ],
    declarations: [
        QuestionComponent,
        DialogComponent,
        DialogOverview
        
    ],
    providers: [
        DialogService,
    ],
    entryComponents: [
        QuestionComponent,
        DialogComponent,
        DialogOverview
    ],
})
export class DialogModule { }