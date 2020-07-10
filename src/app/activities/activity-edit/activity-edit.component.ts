import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/projects/project.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from 'src/app/shared/project.model';
import { Activity } from 'src/app/shared/activity.model';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})

export class ActivityEditComponent implements OnInit {
  subscription: Subscription;
  activityForm: FormGroup;
  project: Project;
  activity: Activity;
  index: number;
  index2: number;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.index2 = +params['id2'];
        this.activity = this.projectService.getProjectActivity(this.index, this.index2);
        this.project = this.projectService.getProject(this.index);

        // call initForm when the route Params change/ page was loaded 
        this.initForm();
      }
    )
  }

  onSubmit() {
    
    this.projectService.updateProjectActivity(this.index, this.index2, this.activityForm.value);
    // return to prior page
    this.onCancel();
  }
  
  onCancel() {
    //  route - go up one route
    this.router.navigate(['/activities'], {relativeTo: this.route});
  }
  
  private initForm() {
    let activityActionStep = '';
    let activityPriority = 0;
    let activityAssignTo = '';
    let activityStatus = '';
    let activityNotes = '';
    
    activityActionStep = this.activity.actionStep;
    activityPriority = this.activity.priority;
    activityAssignTo = this.activity.assignTo;
    activityStatus = this.activity.status;
    activityNotes = this.activity.notes;

//  create a form
    this.activityForm = new FormGroup({
      'actionStep': new FormControl(activityActionStep, Validators.required),
      'priority': new FormControl(activityPriority, [Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'assignTo': new FormControl(activityAssignTo),
      'status': new FormControl(activityStatus, Validators.required),
      'notes': new FormControl(activityNotes),
    })
}

}