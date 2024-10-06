import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'ac-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = '';

  constructor(
    private meta: Meta,
    private projectTitle: Title,
    private router: Router
  ) {
    this.manageRoutesChanges();
  }

  async manageRoutesChanges() {
    await firstValueFrom(this.router.events.pipe(filter(event => event instanceof NavigationEnd)));
    this.setMetaTagsForRoute(this.router.routerState.snapshot.root);
  }

  setMetaTagsForRoute(route: ActivatedRouteSnapshot) {
    this.title = route.data['title'];
    this.projectTitle.setTitle(route.data['title']);
    this.meta.updateTag({ name: 'description', content: route.data['description'] });
    this.meta.updateTag({ name: 'keywords', content: route.data['keywords'] });
  }
}
