import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})

export class ProjectEditComponent implements OnInit {
  id: number;
  editMode = false;
  projectForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        // call initForm when the route Params changed / page was loaded 
        this.initForm();
      }
    )
  }

  onSubmit() {
    if (this.editMode) {
      this.projectService.updateProject(this.id, this.projectForm.value);
    } else {
      this.projectService.addProject(this.projectForm.value);
    }
    this.onCancel();
  }

  onAddActivity() {
    // cast to FormArray type
    (<FormArray>this.projectForm.get('activities')).push(
      new FormGroup({
        'actionStep': new FormControl(null, Validators.required),
        'priority': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'assignTo': new FormControl(null, Validators.required),
        'status': new FormControl(null, Validators.required),
        'notes': new FormControl(null, Validators.required),
      })
    );
  }

  get controls() {
    return (<FormArray>this.projectForm.get('activities')).controls;
  }

  onDeleteActivity(index: number) {
    (<FormArray>this.projectForm.get('activities')).removeAt(index);
  }

  onCancel() {
    //  route - go up one route
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let projectName = '';
    let projectStatus = '';
    let projectType = '';
    let projectBenefit = '';
    let projectVision = '';
    let projectActivities = new FormArray([]);
       
    if (this.editMode) {
      // go get the project from the service
      const project = this.projectService.getProject(this.id);
      projectName = project.name;
      projectStatus = project.status;
      projectType = project.type;
      projectBenefit = project.benefit;
      projectVision = project.vision;
          
      if (project['activities']) {
        for (let activity of project.activities) {
          projectActivities.push(
            
            new FormGroup({
              'actionStep': new FormControl(activity.actionStep, Validators.required),
              'priority': new FormControl(activity.priority, [Validators.pattern(/^[1-9]+[0-9]*$/)]),
              'assignTo': new FormControl(activity.assignTo),
              'status': new FormControl(activity.status, Validators.required),
              'notes': new FormControl(activity.notes),
            })
          );
        }
      }
    }

//  create a form
    this.projectForm = new FormGroup({
      'name': new FormControl(projectName, Validators.required),
      'status': new FormControl(projectStatus, Validators.required),
      'type': new FormControl(projectType, Validators.required),
      'benefit': new FormControl(projectBenefit, Validators.required),
      'vision': new FormControl(projectVision, Validators.required),
      'activities': projectActivities
    })
 }

}
