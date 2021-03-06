import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppGitHubService } from './shared/app-github.service';
import { UserStoreService } from './shared/user-store.service';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GitHubActivityComponent } from './github-activity/github-activity.component';
import { GitHubRepoComponent } from './github-repo/github-repo.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    GitHubActivityComponent,
    GitHubRepoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AppGitHubService,
    UserStoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
