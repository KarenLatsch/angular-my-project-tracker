import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectItemComponent } from './projects/project-list/project-item/project-item.component';
import { ProjectDetailComponent} from './projects/project-detail/project-detail.component';
import { ProjectEditComponent} from './projects/project-edit/project-edit.component';
import { ProjectStartComponent } from './projects/project-start/project-start.component'

import { ActivitiesComponent } from './activities/activities.component';
import { ActivityListComponent} from './activities/activity-list/activity-list.component';
import { ActivityItemComponent} from './activities/activity-list/activity-item/activity-item.component';
import { ActivityEditComponent} from './activities/activity-edit/activity-edit.component';

import { AppRoutingModule } from './app-routing.module'
import { ProjectService } from './projects/project.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectStartComponent,
    ActivitiesComponent,
    ActivityListComponent,
    ActivityItemComponent,
    ActivityEditComponent
        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
   
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
