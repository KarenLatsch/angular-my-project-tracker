import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/projects/project.service';
import { ProjectActivity } from 'src/app/shared/project-activity.model';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})

export class ActivityListComponent implements OnInit, OnDestroy {
  activities: ProjectActivity[];
  subscription: Subscription;

  toDoActivities: ProjectActivity[] = [];
  workingActivities: ProjectActivity[] = [];
  waitingActivities: ProjectActivity[] = [];
  completeActivities: ProjectActivity[] = [];
  
  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    // NEED TO CHANGE TO DETECT CHANGE IN PROJECT!!!!! 
    this.subscription = this.projectService.activitiesChanged
    .subscribe(
      (activities: ProjectActivity[]) => {
        this.activities = activities;
      }
   
    );
   
  this.projectService.loadAllActivities();
  this.toDoActivities = this.projectService.getActivititiesByStatus('To Do');
  this.workingActivities = this.projectService.getActivititiesByStatus('Working');
  this.waitingActivities = this.projectService.getActivititiesByStatus('Waiting');
  this.completeActivities = this.projectService.getActivititiesByStatus('Complete');
 }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
