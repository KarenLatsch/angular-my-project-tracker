import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectActivity } from 'src/app/shared/project-activity.model';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css']
})
export class ActivityItemComponent implements OnInit {
  @Input() activity: ProjectActivity;
  @Input() index: number;
  id: number = this.index;

  // public allActivities: [
  //   [Activity, Activity, Activity, Activity]
  // ] = [[this.inProgressActivities[1], null, null, null]];
  
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onEditActivity() {
    this.router.navigate(['project', this.activity.projectIndex, 'activity', this.activity.activityIndex, 'edit'], {relativeTo: this.route});
  }
}
