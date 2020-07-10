import { Subject } from 'rxjs';
import { Project } from '../shared/project.model';
import { Activity } from '../shared/activity.model';
import { ProjectActivity } from '../shared/project-activity.model';

export class ProjectService {
  projectsChanged = new Subject<Project[]>();
  activitiesChanged = new Subject<ProjectActivity[]>();
 
  private activities: Activity[] = [];
  private allActivities: ProjectActivity[] = [];
  private toDoActivities: ProjectActivity[] = [];
  private workingActivities: ProjectActivity[] = [];
  private waitingActivities: ProjectActivity[] = [];
  private completeActivities: ProjectActivity[] = [];
    
  private projects: Project[] = [
    new Project(
      'Design New WebSite for MGM',
      'Planning',
      'software',
      'Provide client with a Angular driven website',
      'Faster response time for website. New look and feel',
      'See project folder on project drive marked ',
      [
        new Activity('Action 1 for MGM', 1, 'Bob', 'To Do', 'note'),
        new Activity('Action 2 for MGM', 2, 'Frank', 'To Do', 'note')
      ]),
      new Project(
        'Design New WebSite for Amazon',
        'Open',
        'software',
        'Provide client with a Angular driven website',
        'Faster response time for website. New look and feel',
        'See project folder on project drive marked ',
        [
          new Activity('Action 1 for Amazon', 1, 'Frank', 'Waiting', 'note'),
          new Activity('Action 4 for Amazon', 4, 'Kory Daniels', 'To Do', 'note 1'),
          new Activity('Action 3 for Amazon', 3, 'Kory Daniels', 'Working', 'note 2'),
          new Activity('Action 2 for Amazon', 2, 'Kory Daniels', 'Waiting', 'note 3'),
          new Activity('Action 1 for Amazon', 1, 'Kory Daniels', 'Complete', 'note 4')
        ]),
        new Project(
          'Design New WebSite for Kohls',
          'OnHold',
          'software',
          'Provide client with a Angular driven website',
          'Faster response time for website. New look and feel',
          'See project folder on project drive marked ',
          [
            new Activity('Action 1 for Kohls', 1, 'Kate', 'Working', 'note'),
            new Activity('Action 4 for Kohls', 4, 'Kory Daniels', 'To Do', 'note 1'),
            new Activity('Action 3 for Kohls', 3, 'Kory Daniels', 'Working', 'note 2'),
            new Activity('Action 2 for Kohls', 2, 'Kory Daniels', 'Waiting', 'note 3'),
            new Activity('Action 1 for Kohls', 1, 'Kory Daniels', 'Complete', 'note 4')
          ]),
          new Project(
            'Design New WebSite for Walmart',
            'Complete',
            'software',
            'Provide client with a Angular driven website',
            'Faster response time for website. New look and feel',
            'See project folder on project drive marked ',
            [
              new Activity('Action 1 for Walmart', 1, 'Tina', 'Complete', 'note'),
              new Activity('Action 4 for Walmart', 4, 'Kory Daniels', 'Complete', 'note 1'),
              new Activity('Action 3 for Walmart', 3, 'Kory Daniels', 'Working', 'note 2'),
              new Activity('Action 2 for Walmart', 2, 'Kory Daniels', 'Waiting', 'note 3'),
              new Activity('Action 1 for Walmart', 1, 'Kory Daniels', 'Complete', 'note 4')
            ])
    ];
  
  getProject(index: number) {
    return this.projects[index];
  }

  getProjects() {
    return this.projects.slice();
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.loadAllActivities();
    this.projectsChanged.next(this.projects.slice());
  }

  updateProject(index: number, newProject: Project) {
    this.projects[index] = newProject;
    this.loadAllActivities();
    this.projectsChanged.next(this.projects.slice());
  }

  deleteProject(index: number) {
    this.projects.splice(index, 1);
    this.loadAllActivities();
    this.projectsChanged.next(this.projects.slice());
  }

  getProjectActivity(index: number, index2: number) {
      return this.projects[index].activities[index2];
  }

  updateProjectActivity(index: number, index2: number, newActivity: Activity) {
    this.projects[index].activities[index2] = newActivity;
    this.loadAllActivities();
    this.projectsChanged.next(this.projects.slice());
  }

  getAllActivities() {
      return this.allActivities.slice();
  }

  // getActivityByIndexAndStatus(index: number, status: string) {

  //   switch (status) {
  //     case 'To Do':
  //       return this.toDoActivities[index];
  //     case 'Waiting':
  //       return this.waitingActivities[index];
  //     case 'Working':
  //       return this.workingActivities[index];
  //     case 'Complete':
  //       return this.completeActivities[index];
  //     default:
  //       break;
  //      }
  // }

  getActivititiesByStatus(status: string) {

    switch (status) {
      case 'To Do':
        return this.toDoActivities;
      case 'Waiting':
        return this.waitingActivities;
      case 'Working':
        return this.workingActivities;
      case 'Complete':
        return this.completeActivities;
      default:
        break;
       }
  }

  loadAllActivities() {
  // clear arrays 
    this.allActivities = [];
    this.toDoActivities = [];
    this.waitingActivities = [];
    this.workingActivities = [];
    this.completeActivities = [];
    let index3: number;    

    for (let index = 0; index < this.projects.length; index++) {
  
      this.activities = this.projects[index].activities;

      // console.log(this.activities.length + " project index " + index);
      
        for (let index2 = 0; index2 < this.activities.length; index2++) { 
            
          this.allActivities.push(this.allActivities[index3] = { projectName: this.projects[index].name, 
            projectStatus: this.projects[index].status, projectIndex: index, activity: 
            this.activities[index2], activityIndex: index2 }); 

          console.log(index3 + " "  + this.allActivities[index3].projectName + " " +
          this.allActivities[index3].projectStatus + " " + 
          this.allActivities[index3].projectIndex + " "  + 
          this.allActivities[index3].activity.actionStep + " " +
          this.allActivities[index3].activity.priority + " " +
          this.allActivities[index3].activity.assignTo + " " +
          this.allActivities[index3].activity.status + " " +
          this.allActivities[index3].activity.notes );
   
          index3++; 
        }

        console.log(this.allActivities.length + " --- Array count after Push to allActivities")
      

    } 

    this.sortAllActivitiesByStatus(); 
  }

  sortAllActivitiesByStatus(){
         
      for (let index = 0; index < this.allActivities.length; index++) { 
       let currentStatus: string = 
           this.allActivities[index].activity.status
      
       switch (currentStatus) {
         case 'To Do':
           this.toDoActivities.push(this.allActivities[index]);
           break;
         case 'Waiting':
           this.waitingActivities.push(this.allActivities[index]);
           break;
         case 'Working':
           this.workingActivities.push(this.allActivities[index]);
           break;
         case 'Complete':
           this.completeActivities.push(this.allActivities[index]);
           break;
         default:
           break;
        }
      } 
          console.log( this.toDoActivities.length + " to do Activities ");
          console.log( this.waitingActivities.length + " waiting Activities ");
          console.log( this.workingActivities.length + " working Activities ");
          console.log( this.completeActivities.length + " complete Activities ");


  }  
 
}
