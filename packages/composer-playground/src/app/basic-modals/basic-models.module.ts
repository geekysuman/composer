import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BusyComponent } from './busy/busy.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DeleteComponent } from './delete-confirm/delete-confirm.component';
import { ErrorComponent } from './error/error.component';
import { ReplaceComponent } from './replace-confirm/replace-confirm.component';
import { SuccessComponent } from './success/success.component';
import { PublishProgressComponent } from './publish-progress/publish-progress.component';
import { AlertService } from './alert.service';
import { TestModule } from './../test/test.module';

@NgModule({
    imports: [CommonModule, NgbModule, TestModule],
    entryComponents: [BusyComponent, ConfirmComponent, DeleteComponent, ErrorComponent, ReplaceComponent, SuccessComponent, AuthLoginComponent, PublishProgressComponent],
    declarations: [BusyComponent, ConfirmComponent, DeleteComponent, ErrorComponent, ReplaceComponent, SuccessComponent, AuthLoginComponent, PublishProgressComponent],
    providers: [AlertService],
    exports: [BusyComponent, ConfirmComponent, DeleteComponent, ErrorComponent, ReplaceComponent, SuccessComponent, AuthLoginComponent, PublishProgressComponent]
})

export class BasicModalsModule {
}
