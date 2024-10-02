import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CtaComponent } from './shared/components/cta/cta.component';
import { CtaType } from './shared/components/cta/enums/cta-type';

@Component({
  selector: 'ac-root',
  standalone: true,
  imports: [RouterOutlet, CtaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ahead-careers';
  CtaType = CtaType;
}
