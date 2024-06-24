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
  detailUserModal = false;

  showAddUserForm() {
    this.showForm = true;
  }
  // showUpdateUserForm() {
  //   this.showFormUpdate = true;
  // }
  showCloseUserForm() {
    this.showForm = false;
    this.showFormUpdate = false;
  }
  id: number = 0;
  name: string = '';
  email: string = '';
  password: string = '';
  phonenumber: string = '';
  lastname: string = '';
  role: string = '';
  username: string = '';

  // function pour ajouter un nouvel utilisateur
  onSubmit() {
    const newUser: User = {
      id: this.id,
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

  // function pour ouvrir le formulaire de modification d'un utilisateur tout en affichant les informations de l'utilisateur
  showUpdateUserForm(user: any): void {
    // console.log(this.id = user.id);
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.name = user.name;
    this.lastname = user.lastName;
    this.email = user.mail;
    this.phonenumber = user.phoneNumber;
    this.showFormUpdate = true;
  }

  // function pour effectuer la modification d'un utilisateur
  updateUser() {
    const anUser: User = {
      id: this.id,
      username: this.username,
      password: this.password,
      role: this.role,
      name: this.name,
      lastName: this.lastname,
      mail: this.email,
      phoneNumber: this.phonenumber,
    };
    this.userService.updateUser(anUser).subscribe(
      (response) => {
        console.log(response);
        console.log('Utilisateur mis à jour avec succès!', response);
        this.showFormUpdate = false;
        Swal.fire({
          title: 'Succès!',
          text: 'Utilisateur mis à jour avec succès!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.ngOnInit();
      },
      (error) => {
        Swal.fire({
          title: 'Erreur!',
          text:
            "Erreur lors de la mise à jour de l'utilisateur: " + error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  // pour supprimer un utilisateur
  deleteUser(user: User) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous êtes sur le point de supprimer cet utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe(
          (response) => {
            Swal.fire({
              title: 'Succès!',
              text: 'Utilisateur supprimé avec succès!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.users = this.users.filter((u) => u.id !== user.id);
          },
          (error) => {
            Swal.fire({
              title: 'Erreur!',
              text:
                "Erreur lors de la suppression de l'utilisateur: " +
                error.message,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
      }
    });
  }

  // function pour réinitialiser le formulaire
  resetForm() {
    this.username = '';
    this.password = '';
    this.role = '';
    this.name = '';
    this.lastname = '';
    this.email = '';
    this.phonenumber = '';
  }

  // function pour afficher les détails d'un utilisateur
  showDetailUser(user: User): void {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.name = user.name;
    this.lastname = user.lastName;
    this.email = user.mail;
    this.phonenumber = user.phoneNumber;

    this.userService.getUserById(user.id).subscribe(
      (response) => {
        console.log('Utilisateur:', response);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
    this.detailUserModal = true;

    // setTimeout(() => {
    //   this.detailUserModal = false;
    // }, 5000);
  }

  closeModalDetail(){
    this.detailUserModal = false;
  }
}
