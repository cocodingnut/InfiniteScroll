import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})

export class TestimonialsComponent implements OnInit {
  testimonials: any[] = [];
  private apiUrl = '/api/fe/testimonials';
  hasNext: boolean = true;
  lastId!: string;
  isLoading = false;

  constructor(private http: HttpClient, private elRef: ElementRef) { }

  ngOnInit() {
    this.fetchTestimonials();
  }

  fetchTestimonials(lastId?: string): void {
    if (this.isLoading) {
      return;
    }

    let params = new HttpParams().set('limit', '5');
    if (lastId) {
      params = params.set('after', lastId);
    }

    this.http.get<any>(this.apiUrl, { params }).pipe(
      tap(response => {
        console.log('API Response:', response);
        this.testimonials = this.testimonials.concat(response.testimonials);
        if (response.testimonials.length > 0) {
          this.lastId = response.testimonials[response.testimonials.length - 1].id;
          this.hasNext = response.hasNext;
        } else {
          this.hasNext = false;
        }
      }),
    ).subscribe();
  }

  onScroll() {
    const ele = this.elRef.nativeElement.querySelector('#testimonial-container');
    console.log(ele.scrollHeight, ele.clientHeight, ele.scrollTop);
    if (ele.scrollTop + ele.clientHeight == ele.scrollHeight && this.hasNext) {
      this.fetchTestimonials(this.lastId);
    }
  }
}