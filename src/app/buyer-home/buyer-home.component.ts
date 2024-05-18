import { Component } from '@angular/core';
import { Client, Account, Databases, Query } from 'appwrite';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrls: ['./buyer-home.component.css'],
})
export class BuyerHomeComponent implements OnInit {
  ngOnInit(): void {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('66486cfe003787594c1f'); // Your project ID

    const account = new Account(client);

    /*const res = account.deleteSessions();
    res.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );*/

    const res = account.get();

    res.then(
      (response) => {
        //console.log(response);

        const databases = new Databases(client);
        const result = databases.listDocuments(
          '66488ed5002f8fab432c', // databaseId
          '66488f240034dfe66288', // collectionId
          [Query.equal('UserId', response.$id)] // queries (optional)
        );

        result.then(
          (response) => {
            //console.log(response); // Success

            if (response.documents[0]['Type'] == 'Buyer') {
              const databases = new Databases(client);
              const result = databases.listDocuments(
                '66488ed5002f8fab432c', // databaseId
                '66488fc00008c2127f23' // collectionId
              );

              result.then(
                (response) => {
                  this.listings = response.documents;
                  //console.log(this.listings);
                },
                (error) => {
                  console.log(error);
                }
              );
            } else {
              console.log(
                'This page cannot be accessed by a seller. Redirecting to seller home page.'
              );
              this.router.navigate(['/seller']);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      function (error) {
        console.log(error);
        this.router.navigate(['/']);
      }
    );
  }

  constructor(private router: Router) {}

  listings: any = [];
}
