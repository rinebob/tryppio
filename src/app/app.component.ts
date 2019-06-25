import { AuthService } from './auth/signup/auth.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Image } from './images/image.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Tryppio';
  storedImages: Image[] = [];

  constructor(private authService: AuthService){}

  onImageAdded(image) {
    this.storedImages.push(image);
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }


}
