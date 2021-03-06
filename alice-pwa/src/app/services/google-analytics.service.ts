import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AcceptCookieService } from './accept-cookie.service';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  gaMeasurementId: string;

  // cfr https://blexin.com/it/blog/google-analytics/

  constructor(private router: Router, private cookies: AcceptCookieService) {
  }

  public init(gaMeasurementId: string) {
    this.gaMeasurementId = gaMeasurementId;
    if (this.gaMeasurementId) {
      gtag('js', new Date());
    } else {
      console.log('gtag js')
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.gaMeasurementId) {
          gtag('config', this.gaMeasurementId,{
            'page_path': event.urlAfterRedirects,
            'anonimize_ip': !this.cookies.accept
          });
        } else {
          console.log('gtag config', this.gaMeasurementId, this.cookies.accept, event.urlAfterRedirects);
        }
      }
    });
  }

  public event(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
      let options = {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      };
      if (this.gaMeasurementId) {
        gtag('event', eventName, options)
      } else {
        console.log('gtag event', eventName, options);
      }
  }

}