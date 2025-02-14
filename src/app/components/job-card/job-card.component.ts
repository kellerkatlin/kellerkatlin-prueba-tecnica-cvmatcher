import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from '../../entities/models/job.model';
import { CommonModule } from '@angular/common';
import { JobMenuComponent } from '../job-menu/job-menu.component';
import { JobService } from '../../services/services/job.service';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, JobMenuComponent],
  templateUrl: './job-card.component.html',
})
export class JobCardComponent implements OnInit {
  @Input() job!: Job;
  @Output() select = new EventEmitter<Job>();
  isHidden: boolean = false;
  percentage: number = 0;

  constructor(private jobStateService: JobService) {}

  ngOnInit() {
    this.isHidden = this.jobStateService.isJobHidden(this.job.job_id);
    this.percentage = Math.floor(Math.random() * 50) + 50;

    this.jobStateService.hiddenJobs.subscribe((hiddenJobs) => {
      this.isHidden = hiddenJobs.includes(this.job.job_id);
    });
  }

  toggleHidden() {
    this.jobStateService.toggleHiddenJob(this.job.job_id);
  }

  dateFormat(date: string) {
    return date.replace(/-/g, '/');
  }

  onClick() {
    this.select.emit(this.job);
  }
}
