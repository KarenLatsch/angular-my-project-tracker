import { Activity } from './activity.model'

export class ProjectActivity {

    constructor(
        public projectName: string, 
        public projectStatus: string,
        public projectIndex: number,
        public activity: Activity,    
        public activityIndex: number)     
      {
          this.projectName = projectName;
          this.projectStatus = projectStatus;
          this.projectIndex = projectIndex;
          this.activity = activity;
          this.activityIndex = activityIndex;
      }
  }
  