import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-filters',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './job-filters.component.html',
  styleUrl: './job-filters.component.scss',
})
export class JobFiltersComponent {
  @Input() title: string = '';
  @Input() location: string = '';
  @Input() jobType: number | null = null;
  @Input() experience: number | null = null;

  @Output() search = new EventEmitter<{
    title: string;
    location: string;
    jobType: number | null;
    experience: number | null;
  }>();

  onSearch() {
    this.search.emit({
      title: this.title.trim() || '',
      location: this.location.trim() || '',
      jobType: this.jobType,
      experience: this.experience,
    });
  }
}
