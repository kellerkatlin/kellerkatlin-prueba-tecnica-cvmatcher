import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jsonUrl = 'assets/data/data-jobs.json';
  private _hiddenJobs = new BehaviorSubject<number[]>([]);
  private _favoriteJobs = new BehaviorSubject<number[]>([]);

  constructor(private http: HttpClient) {}

  get hiddenJobs() {
    return this._hiddenJobs.asObservable();
  }

  get favoriteJobs() {
    return this._favoriteJobs.asObservable();
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jsonUrl);
  }

  searchJobs(
    title?: string,
    location?: string,
    jobType?: number | null,
    experience?: number | null
  ): Observable<Job[]> {
    return this.getJobs().pipe(
      map((jobs) =>
        jobs.filter(
          (job) =>
            (title
              ? job.title.toLowerCase().includes(title.toLowerCase())
              : true) &&
            (location
              ? job.location.toLowerCase().includes(location.toLowerCase())
              : true) &&
            (jobType !== null && jobType !== undefined
              ? job.job_type_id === jobType
              : true) &&
            (experience !== null && experience !== undefined
              ? job.years_experience === experience
              : true)
        )
      )
    );
  }
  toggleHiddenJob(jobId: number) {
    const currentHiddenJobs = this._hiddenJobs.value;
    if (currentHiddenJobs.includes(jobId)) {
      this._hiddenJobs.next(currentHiddenJobs.filter((id) => id !== jobId));
    } else {
      this._hiddenJobs.next([...currentHiddenJobs, jobId]);
    }
  }

  toggleFavoriteJob(jobId: number) {
    const currentFavoriteJobs = this._favoriteJobs.value;
    if (currentFavoriteJobs.includes(jobId)) {
      this._favoriteJobs.next(currentFavoriteJobs.filter((id) => id !== jobId));
    } else {
      this._favoriteJobs.next([...currentFavoriteJobs, jobId]);
    }
  }

  isJobHidden(jobId: number): boolean {
    return this._hiddenJobs.value.includes(jobId);
  }

  isJobFavorite(jobId: number): boolean {
    return this._favoriteJobs.value.includes(jobId);
  }
}
