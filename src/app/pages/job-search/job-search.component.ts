import { Component, OnInit } from '@angular/core';
import { Job } from '../../jobs/models/job.model';
import { JobService } from '../../jobs/services/job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobFiltersComponent } from '../../shared/job-filters/job-filters.component';
import { JobCardComponent } from '../../shared/job-card/job-card.component';
import { JobDetailsComponent } from '../../core/components/job-details/job-details.component';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [
    CommonModule,
    JobFiltersComponent,
    JobCardComponent,
    JobDetailsComponent,
  ],
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.scss',
})
export class JobSearchComponent implements OnInit {
  jobs: Job[] = [];
  title: string = '';
  selectedJob: Job | null = null;
  location: string = '';
  jobType: number | null = null;
  experience: number | null = null;
  isOpenModalMobile: boolean = false;

  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.title = params['title'] ? this.formatString(params['title']) : '';
      this.location = params['location']
        ? this.formatString(params['location'])
        : '';
      this.jobType = params['jobType'] ? Number(params['jobType']) : null;
      this.experience = params['experience']
        ? Number(params['experience'])
        : null;

      this.onSearch();
    });
  }

  onFilterChange(filters: {
    title: string;
    location: string;
    jobType: number | null;
    experience: number | null;
  }) {
    this.title = filters.title;
    this.location = filters.location;
    this.jobType = filters.jobType;
    this.experience = filters.experience;

    this.onSearch();
  }

  onSearch(updateUrl: boolean = true): void {
    const filteredTitle = this.title.trim() || '';
    const filteredLocation = this.location.trim() || '';
    const filteredJobType = this.jobType !== null ? Number(this.jobType) : null;
    const filteredExperience =
      this.experience !== null ? Number(this.experience) : null;
    console.log(this.title, 'desde el search');

    let queryParams: any = {};

    if (filteredTitle)
      queryParams['title'] = this.generateSeoFriendlyString(filteredTitle);
    if (filteredLocation)
      queryParams['location'] =
        this.generateSeoFriendlyString(filteredLocation);
    if (filteredJobType !== null) queryParams['jobType'] = filteredJobType;
    if (filteredExperience !== null)
      queryParams['experience'] = filteredExperience;

    if (updateUrl) {
      this.router.navigate(['/buscar'], { queryParams });
    }

    this.jobService
      .searchJobs(
        filteredTitle,
        filteredLocation,
        filteredJobType,
        filteredExperience
      )
      .subscribe((data) => {
        this.jobs = data;
      });
  }
  generateSeoFriendlyString(text: string): string {
    return text.replace(/\s+/g, '-').toLowerCase();
  }

  formatString(text: string): string {
    return text.replace(/-/g, ' ');
  }
  selectJob(job: Job) {
    this.selectedJob = job;
    this.isOpenModalMobile = true;
  }
  closeModal() {
    this.isOpenModalMobile = false;
  }
}
