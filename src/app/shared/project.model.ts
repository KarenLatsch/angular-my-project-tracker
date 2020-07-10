import { Activity } from './activity.model'

export class Project {

    constructor(
        public name: string, 
        public status: string,
        public type: string, 
        public benefit: string, 
        public vision: string,
        public supportMaterial: string,
        public activities: Activity[])     
      {
          this.name = name;
          this.status = status;
          this.type = type;
          this.benefit = benefit;
          this.vision = vision;
          this.supportMaterial = supportMaterial;
          this.activities = activities;
      }
  }
  