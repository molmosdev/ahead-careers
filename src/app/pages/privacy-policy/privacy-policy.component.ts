import { Component, computed, inject, OnInit } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { ResponsiveService } from '../../core/services/responsive.service';
import { NgClass } from '@angular/common';
import { TitleAndContent } from '../../shared/interfaces/title-and-content';

@Component({
  selector: 'ac-privacy-policy',
  imports: [NgClass],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent implements OnInit {
  sanityService = inject(SanityService);
  privacyPolicy = computed<TitleAndContent>(() => {
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
      type: 'privacyPolicy',
      singleton: true,
      filters: [],
    });
  }
}
