import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client, Account } from 'appwrite';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('66486cfe003787594c1f'); // Your project ID

    const account = new Account(client);

    const res = account.deleteSessions();
    res.then(
      (response) => {
        //console.log(response); // Success
        this.router.navigate(['/']);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  }
}
