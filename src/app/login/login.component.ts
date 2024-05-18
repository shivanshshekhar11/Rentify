import { Component } from '@angular/core';
import { Client, Account, Databases, Query } from 'appwrite';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('66486cfe003787594c1f'); // Your project ID

    const account = new Account(client);

    const res = account.deleteSessions();
    res.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );

    /*const res = account.get();

    res.then(
       (response) => {
        //console.log(response);

        const databases = new Databases(client);
        const result = databases.listDocuments(
          '66488ed5002f8fab432c', // databaseId
          '66488f240034dfe66288', // collectionId
          [Query.equal('UserId', response['userId'])] // queries (optional)
        );

        result.then((response) => {
          //console.log(response); // Success

          if (response.documents[0]['Type'] == 'Buyer') {
            this.router.navigate(['/buyer']);
          } else {
            this.router.navigate(['/seller']);
          }
        }, (error) => {
          console.log(error);
        });
      },
      function (error) {
        console.log(error);
      }
    );*/
  }
  constructor(private router: Router) {}
  email: string = '';
  password: string = '';
  alertMsg: string = '';

  submit() {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('66486cfe003787594c1f'); // Your project ID

    const account = new Account(client);

    const promise = account.createEmailPasswordSession(
      this.email,
      this.password
    );

    promise.then(
      (response) => {
        //console.log(response); // Success

        const databases = new Databases(client);
        const result = databases.listDocuments(
          '66488ed5002f8fab432c', // databaseId
          '66488f240034dfe66288', // collectionId
          [Query.equal('UserId', response.userId)] // queries (optional)
        );

        result.then((response) => {
          //console.log(response); // Success

          if (response.documents[0]['Type'] == 'Buyer') {
            this.router.navigate(['/buyer']);
          } else {
            this.router.navigate(['/seller']);
          }
        });
      },
      (error) => {
        console.log(error); // Failure
      }
    );
  }
}
