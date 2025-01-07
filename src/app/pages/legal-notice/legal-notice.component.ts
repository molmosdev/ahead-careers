import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { ResponsiveService } from '../../core/services/responsive.service';
import { TitleAndContent } from '../../shared/interfaces/title-and-content';

@Component({
  selector: 'ac-legal-notice',
  imports: [],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.css',
})
export class LegalNoticeComponent implements OnInit {
  sanityService = inject(SanityService);
  legalNotice = signal<TitleAndContent | undefined>(undefined);
  responsiveService = inject(ResponsiveService);
  isMobile = computed(() => this.responsiveService.isMobile());

  async ngOnInit(): Promise<void> {
    const data = await this.sanityService.getDataByType('legalNotice', true);
    this.legalNotice.set({
      ...data,
      content: this.sanityService.transformBlockToHtml(data?.content),
    });
  }
}
