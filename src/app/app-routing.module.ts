import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectItemComponent } from './projects/project-list/project-item/project-item.component';
import { ProjectDetailComponent} from './projects/project-detail/project-detail.component';
import { ProjectEditComponent} from './projects/project-edit/project-edit.component';
import { ProjectStartComponent } from './projects/project-start/project-start.component'
import { ActivityListComponent} from './activities/activity-list/activity-list.component';
import { ActivityEditComponent} from './activities/activity-edit/activity-edit.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent, children: [
    { path: '', component: ProjectStartComponent },
    // new must be first - else it will look for id "new"
    { path: 'new', component: ProjectEditComponent },
    { path: ':id', component: ProjectDetailComponent },
    { path: ':id/edit', component: ProjectEditComponent },
] },

{ path: 'activities', component: ActivityListComponent }, 
{ path: 'activities/project/:id/activity/:id2/edit', component: ActivityEditComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
