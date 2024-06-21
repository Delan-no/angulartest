import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  closeForm() {
    // Logic to close the form
  }
  showForm = false;

  showAddUserForm() {
    this.showForm = true;
  }

  handleCloseForm() {
    this.showForm = false;
  }
}
