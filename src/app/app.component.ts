import { Component, OnInit } from '@angular/core';

import { GitHubRepoService } from './github-repo/github-repo.service';
import Repo from './Models/Repo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private repos: Repo[];

  constructor(private repoService: GitHubRepoService) {}

  ngOnInit() {
    this.getRepositories('cameverett');
  }

  private getRepositories(username: string): void {
    this.repoService.getRepos(username)
      .then(repos => this.repos = repos);
  }
}
