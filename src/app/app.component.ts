import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
  selector: 'ac-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
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
      this.setMetaTagsForRoute(this.router.routerState.snapshot.root);
    });
  }

  setMetaTagsForRoute(route: ActivatedRouteSnapshot) {
    this.projectTitle.setTitle(route.data['title']);
    this.meta.updateTag({ name: 'description', content: route.data['description'] });
    this.meta.updateTag({ name: 'keywords', content: route.data['keywords'] });
  }
}
