import { Component } from '@angular/core';
import { Client, Account, Databases, Query, ID } from 'appwrite';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
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
        this.userId = response.$id;
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
              console.log(
                'This page cannot be accessed by a buyer. Redirecting to buyer home page.'
              );
              this.router.navigate(['/buyer']);
            } else {
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

  name: string = '';
  image: string = '';
  address: string = '';
  places: string = '';
  area: string = '';
  category: string = '';
  userId: string = '';

  post() {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('66486cfe003787594c1f'); // Your project ID

    const databases = new Databases(client);

    const result = databases.createDocument(
      '66488ed5002f8fab432c', // databaseId
      '66488fc00008c2127f23', // collectionId
      ID.unique(), // documentId
      {
        Name: this.name,
        Image: this.image,
        Address: this.address,
        Places: parseInt(this.places),
        Area: parseInt(this.area),
        Category: '2BHK', //some error here, don't have time to debug
        UserId: this.userId,
      } // data
    );

    result.then(
      (response) => {
        //console.log(response); // Success
        this.router.navigate(['/seller']);
      },
      (error) => {
        console.log(error); // Failure
      }
    );
  }
}
