import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from 'src/app/shared/project.model';
import { Subscription } from 'rxjs';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[];
  subscription: Subscription;

  constructor(private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.projectService.projectsChanged
    .subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
   
    );

  this.projects = this.projectService.getProjects();
  }

  onNewProject() {
    this.router.navigate(['new'], {relativeTo: this.route});
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
