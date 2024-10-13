import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // first, an empty array of users
  private users: User[] = [];

  // then, the current ID
  private currentId = 1;

  // an empty constructor...
  constructor() { }

  // Method to GET all the users
  getUsers(): User[] {
    return this.users;
  }

  // Method to add a new user
  addUser(email: string, password: string, firstName: string, lastName: string, relation: string): void {

    // characteristics of the new User
    const newUser: User = {
      id: this.currentId,
      email, password, firstName, lastName,
      relation: relation as 'classmate' | 'professor' | 'coworker' | 'friend' | 'other'
    };

    // adding the new user to the list of users
    this.users.push(newUser);

    // updating the current ID
    this.currentId++;

    // logging the operation
    console.log('User added:', newUser);
  }
}
