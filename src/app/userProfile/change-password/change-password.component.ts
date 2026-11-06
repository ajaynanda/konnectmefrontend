import { Component, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import { UserService } from 'src/app/user/user.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
    imports: [ReactiveFormsModule]
})
export class ChangePasswordComponent implements OnInit {
  id: any;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private userService: UserService,
    private fb: UntypedFormBuilder,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('KMuser') || '{}')._id;
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  passwordForm = this.fb.group({
    opassword: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
    npassword: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
    cpassword: new UntypedFormControl('', [Validators.required, Validators.minLength(6)])
  }, {
    validators: this.mustMatch('npassword', 'cpassword')
  });

  newPassword(formData: { opassword: string; npassword: string; cpassword: string }): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.userService.changePassword(this.id, formData).subscribe({
      next: () => this.dialogRef.close(),
      error: (err) => this.notification.showError(err.error.message)
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private mustMatch(password: string, confirmation: string) {
    return (formGroup: AbstractControl): ValidationErrors | null =>
      formGroup.get(password)?.value === formGroup.get(confirmation)?.value
        ? null
        : { mustmatch: true };
  }

  get controls() {
    return this.passwordForm.controls;
  }
}
