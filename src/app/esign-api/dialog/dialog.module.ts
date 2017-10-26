import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatInputModule,MatIconModule } from '@angular/material';

import { DialogComponent, DialogOverview } from './dialog.component';
import { DialogService } from './dialog.service';
import { HttpModule } from '@angular/http'

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        CommonModule,
        FormsModule,
        HttpModule
    ],
    exports: [
        DialogComponent
    ],
    declarations: [
        DialogComponent,
        DialogOverview
        
    ],
    providers: [
        DialogService,
    ],
    entryComponents: [
        DialogComponent,
        DialogOverview
    ],
})
export class DialogModule { }