import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { JobService } from '../../jobs/services/job.service';
import { Job } from '../../jobs/models/job.model';

@Component({
  selector: 'app-job-menu',
  standalone: true,
  imports: [],
  templateUrl: './job-menu.component.html',
  styleUrl: './job-menu.component.scss',
})
export class JobMenuComponent {
  @Input() isMenuOpen: boolean = false;
  @Input() jobId!: number;
  @Input() job!: Job;
  isFavorite: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private jobStateService: JobService
  ) {}

  ngOnInit() {
    this.isFavorite = this.jobStateService.isJobFavorite(this.job.job_id);

    this.jobStateService.favoriteJobs.subscribe((favoriteJobs) => {
      this.isFavorite = favoriteJobs.includes(this.job.job_id);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleHidden() {
    this.jobStateService.toggleHiddenJob(this.jobId);
  }

  toggleFavorite() {
    this.jobStateService.toggleFavoriteJob(this.jobId);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
}
