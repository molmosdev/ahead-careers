import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { ResponsiveService } from '../../core/services/responsive.service';
import { TitleAndContent } from '../../shared/interfaces/title-and-content';

@Component({
  selector: 'ac-cookies',
  imports: [NgClass],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css',
})
export class CookiesComponent implements OnInit {
  sanityService = inject(SanityService);
  cookies = computed<TitleAndContent>(() => {
    const data = this.sanityService.data.value();
    return {
      ...data,
      content: this.sanityService.transformBlockToHtml(data?.content),
    };
  });
  responsiveService = inject(ResponsiveService);
  isMobile = computed(() => this.responsiveService.isMobile());

  ngOnInit(): void {
    this.sanityService.params.set({
      type: 'cookies',
      singleton: true,
      filters: [],
    });
  }
}
