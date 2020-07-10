export class Activity {
    
    constructor(
        public actionStep: string,
        public priority: number,
        public assignTo: string, 
        public status: string,  
        public notes: string) {
        }
  }
  