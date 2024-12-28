import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { ResponsiveService } from '../../core/services/responsive.service';
import { TitleAndContent } from '../../shared/interfaces/title-and-content';

@Component({
  selector: 'ac-legal-notice',
  imports: [NgClass],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.css',
})
export class LegalNoticeComponent implements OnInit {
  sanityService = inject(SanityService);
  legalNotice = computed<TitleAndContent>(() => {
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
      type: 'legalNotice',
      singleton: true,
      filters: [],
    });
  }
}
