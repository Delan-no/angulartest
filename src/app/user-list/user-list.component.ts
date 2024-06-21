// src/app/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  showForm = false;

  showAddUserForm() {
    this.showForm = true;
    // console.log('show form');
  }
  showCloseUserForm() {
    this.showForm = false;
    // console.log('close form');
  }

  name: string = '';
  email: string = '';
  password: string = '';
  phonenumber: string = '';
  lastname: string = '';
  role: string = '';
  username: string = '';

  onSubmit() {
    const newUser: User = {
      username: this.username,
      password: this.password,
      role: this.role,
      name: this.name,
      lastname: this.lastname,
      mail: this.email,
      phonenumber: this.phonenumber
    };

    console.log('Nouvel utilisateur : ', newUser);
    this.userService.addUser(newUser).subscribe(
      
      (response) => {
        console.log('Utilisateur créé avec succès !', response);
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur : ', error);
      }
    );
  }

  resetForm() {
    this.username = '';
    this.password = '';
    this.role = '';
    this.name = '';
    this.lastname = '';
    this.email = '';
    this.phonenumber = '';
  }

}
