import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, IPost } from '../../services/api.service';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class APIComponent implements OnInit {
  posts: IPost[] = [];

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this._apiService.getAPIs().subscribe((data) => (this.posts = data));
  }

  addNewAPI() {
    const newPost: IPost = {
      id: this.posts.length ? this.posts[this.posts.length - 1].id + 1 : 1,
      title: 'New Post Title',
      body: 'This is the body of the new post.',
      userId: 1 // Adjust the userId as needed
    };

    this._apiService.addAPI(newPost).subscribe((data) => {
      this.posts.push(data);
      console.log('New post added:', data);
    });
  }

  updateAPI() {
    const postToUpdate: IPost = {
      ...this.posts[0], // Example of updating the first post
      title: 'Updated Post Title',
      body: 'This is the updated body of the post.'
    };

    this._apiService.updateAPI(postToUpdate).subscribe((data) => {
      const index = this.posts.findIndex(post => post.id === data.id);
      if (index !== -1) {
        this.posts[index] = data;
      }
      console.log('Post updated:', data);
    });
  }

  deleteAPI() {
    const postIdToDelete = this.posts[0]?.id; // Example of deleting the first post
    if (postIdToDelete) {
      this._apiService.deleteAPI(postIdToDelete).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== postIdToDelete);
        console.log('Post deleted:', postIdToDelete);
      });
    }
  }

  trackById(index: number, post: any): number {
    return post.id;
  }
}