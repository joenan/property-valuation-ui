import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutsService {

  constructor() { }

  getNavigationItems(): any[] {
    return [
      { label: 'Dashboard', icon: 'bi-grid', link: 'dashboard',  },
      { label: 'Profile', icon: 'bi-person', link: '/initiators-details' },
      { label: 'Facility Details', icon: 'bi-building', link: '/facility-details' },
      { label: 'Property Valuation', icon: 'bi-building', link: '/property-valuation' },
      { label: 'Borrowers Details', icon: 'bi-building', link: '/borrowers-details' },
      { label: 'Comments', icon: 'bi-building', link: '/comments' },
      { label: 'Upload Section', icon: 'bi-building', link: '/upload-section' },
      { label: 'PVC Validation Requests', icon: 'bi-building', link: '/pvc-validation-requests' },
    
    ];
  }
}
