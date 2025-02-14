import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Job } from '../../../jobs/models/job.model';
import { JobService } from '../../../jobs/services/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent implements OnInit {
  @Input() job!: Job;
  @Input() isFavorite: boolean = false;
  @Input() isHidden: boolean = false;

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.updateJobStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['job']) {
      this.updateJobStatus();
    }
  }

  private updateJobStatus() {
    this.jobService.favoriteJobs.subscribe((favoriteJobs) => {
      this.isFavorite = favoriteJobs.includes(this.job.job_id);
    });
    this.jobService.hiddenJobs.subscribe((hiddenJobs) => {
      this.isHidden = hiddenJobs.includes(this.job.job_id);
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.jobService.toggleFavoriteJob(this.job.job_id);
  }

  toggleHidden() {
    this.isHidden = !this.isHidden;
    this.jobService.toggleHiddenJob(this.job.job_id);
  }

  dateFormat(date: string) {
    return date.replace(/-/g, '/');
  }
}
