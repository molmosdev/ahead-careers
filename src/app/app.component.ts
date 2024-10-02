import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'ac-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private meta: Meta,
    private projectTitle: Title,
    private router: Router
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.routerState.snapshot.root;
      this.setMetaTagsForRoute(currentRoute);
    });
  }

  setMetaTagsForRoute(route: ActivatedRouteSnapshot) {
    const title = route.data['title'] || 'Ahead Careers - Tu camino hacia el éxito';
    const description = route.data['description'] || 'Explora oportunidades laborales y consejos de carrera';
    const keywords = route.data['keywords'] || 'Ahead Careers, oportunidades laborales, consejos de carrera';

    this.projectTitle.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }
}
