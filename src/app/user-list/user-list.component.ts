// src/app/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import Swal from 'sweetalert2';

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
  showFormUpdate = false;

  showAddUserForm() {
    this.showForm = true;
  }
  showUpdateUserForm() {
    this.showFormUpdate = true;
  }
  showCloseUserForm() {
    this.showForm = false;
    this.showFormUpdate = false;
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
      id: this.users.length + 1,
      username: this.username,
      password: this.password,
      role: this.role,
      name: this.name,
      lastName: this.lastname,
      mail: this.email,
      phoneNumber: this.phonenumber,
    };

    // pour ajouter un utilisateur
    this.userService.addUser(newUser).subscribe(
      (response) => {
        console.log('Utilisateur créé avec succès !', response);
        this.resetForm();
        this.users.push(newUser);
        this.showForm = false;
        Swal.fire({
          title: 'Succès!',
          text: 'Utilisateur créé avec succès!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        Swal.fire({
          title: 'Erreur!',
          text: "Erreur lors de la création de l'utilisateur: " + error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  updateUser(newUser: User) {
    // pour modifier un utilisateur
    this.userService.updateUser(newUser).subscribe(
      (response) => {
        console.log('Utilisateur mis à jour avec succès!', response);
        this.resetForm();
        this.users.push(newUser);
        this.showForm = false;
      },
      (error) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur!", error);
      }
    );
  }

  // pour supprimer un utilisateur
  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(
      () => {
        console.log('Utilisateur supprimé avec succès!');
        this.users = this.users.filter((user) => user.id!== user.id);
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur!', error);
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
