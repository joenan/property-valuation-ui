import { Component, OnInit } from '@angular/core';
import { LayoutsService } from '../layouts.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activeItem: string = 'Dashboard';
  navigationItems!: any[];

  constructor(private layouts: LayoutsService, private router: Router) { }

  ngOnInit(): void {
    this.navigationItems = this.layouts.getNavigationItems();
    this.setActiveItem(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveItem(this.router.url);
      }
    });
  }

  setActiveItem(url: string) {
    let matchingItem: any = null;

    for (const item of this.navigationItems) {
      if (item.link === url || (item.children && item.children.some((child: any) => child.link === url))) {
        matchingItem = item;
        break;
      }
    }

    if (matchingItem) {
      this.activeItem = matchingItem.label;
    } else {
      this.activeItem = 'Dashboard';
    }
  }

  // This function is called when a nav-item is clicked
  onClickNavItem(itemLabel: string) {
    this.activeItem = itemLabel;
  }

  getNextActiveItemColor(): string {
    const currentIndex = this.navigationItems.findIndex(item => item.label === this.activeItem);
    const nextIndex = (currentIndex + 1) % this.navigationItems.length;
    const nextActiveItem = this.navigationItems[nextIndex];

    // Check if nextActiveItem exists and return its color
    return nextActiveItem ? nextActiveItem.color : '';
  }
}
