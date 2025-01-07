import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { ResponsiveService } from '../../core/services/responsive.service';
import { TitleAndContent } from '../../shared/interfaces/title-and-content';

@Component({
  selector: 'ac-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent implements OnInit {
  sanityService = inject(SanityService);
  privacyPolicy = signal<TitleAndContent | undefined>(undefined);
  responsiveService = inject(ResponsiveService);
  isMobile = computed(() => this.responsiveService.isMobile());

  async ngOnInit(): Promise<void> {
    const data = await this.sanityService.getDataByType('privacyPolicy', true);
    this.privacyPolicy.set({
      ...data,
      content: this.sanityService.transformBlockToHtml(data?.content),
    });
  }
}
