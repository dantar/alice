import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-badge-map',
  templateUrl: './badge-map.component.html',
  styleUrls: ['./badge-map.component.scss'],
  animations: [
    trigger('badge', [
      // states
      state('mini', style({
        transform: 'scale(1)',
      }), { params: { x: 0, y: 0, s: 1 } }),
      state('full', style({
        transform: 'translate(50px,50px) scale({{s}}) translate({{x}}px,{{y}}px) ',
      }), { params: { x: 0, y: 0, s: 10 } }),
      // transitions
      transition('mini => full', animate('1000ms ease-in-out')),
      transition('full => mini', animate('1000ms ease-in-out')),
    ]),
    trigger('names', [
      // states
      state('mini', style({
        transform: 'translate({{x}}px,{{y}}px) scale({{s}})',
      }), { params: { x: 0, y: 0, s: 0.1 } }),
      state('full', style({
        transform: 'translate(10px,10px) scale(10)',
      })),
      // transitions
      transition('mini => full', animate('1000ms ease-in-out')),
      transition('full => mini', animate('1000ms ease-in-out')),
    ]),
    trigger('nasopopup', [
      // states
      state('hidden', style({
        transform: 'translate({{x}}px,{{y}}px) scale(0) rotate(0deg)',
      }), { params: { x: 0, y: 0, s: 0.1 } }),
      state('shown', style({
        transform: 'translate({{x}}px,{{y}}px) scale(0.15) rotate(25deg) ',
      }), { params: { x: 0, y: 0, s: 1 } }),
      // transitions
      transition('hidden => shown', animate('3500ms ease-in-out')),
      transition('shown => hidden', animate('300ms ease-in-out')),
    ]),
    trigger('fadeinout', [
      transition(':enter', [style({opacity: 0}), animate('1s', style({opacity: 1}))]),
      transition(':leave', [style({opacity: 1}), animate('1s', style({opacity: 0}))]),
    ]),
    trigger('fadefullmini', [
      // states
      state('mini', style({opacity: 0})),
      state('full', style({opacity: 0.8})),
      // transitions
      transition('mini => full', animate('1000ms ease-in-out')),
      transition('full => mini', animate('1000ms ease-in-out')),
    ]),
    trigger('zoominout', [
      transition(':enter', [style({transform: 'scale(0)'}), animate('1s', style({transform: 'scale(1)'}))]),
      transition(':leave', [style({transform: 'scale(1)'}), animate('1s', style({transform: 'scale(0)'}))]),
    ]),
    trigger('mediaitem', [
      transition(':enter', [style({opacity: 0}), animate('1s', style({opacity: 1}))]),
      transition(':leave', [style({opacity: 1}), animate('1s', style({opacity: 0}))]),
    ]),
    trigger('dissolve', [
      state('hidden', style({opacity: 0})),
      state('shown', style({opacity: 1})),
      transition('hidden => shown', animate('500ms ease-in-out')),
      transition('shown => hidden', animate('500ms ease-in-out')),
    ]),
    trigger('pulsating', [
      // states
      state('big', style({
        transform: 'scale(1.2)',
      }), { params: { s: 1.2 } }),
      state('small', style({
        transform: 'scale(1)',
      }), { params: { s: 1 } }),
      // transitions
      transition('big => small', animate('1000ms ease-in-out')),
      transition('small => big', animate('1000ms ease-in-out')),
    ]),
  ],

})
export class BadgeMapComponent implements OnInit {

  svgmap: SvgMap;
  svg: Document;

  background: BadgeMapItem;
  areas: BadgeMapItem[];
  serializer: XMLSerializer;

  constructor(
    private shared: SharedDataService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.serializer = new XMLSerializer();
    this.svgmap = {"id": "agora", "svg": "badges.svg", "background": null, "ids": ["badge-01", "badge-02", "cappellaio-matto", "regina-cuori"]};
    this.initSvgMap();
  }

  badgeStatePin(badge: BadgeMapItem) {
    return { value: badge.state, params: { x: -badge.dx, y: -badge.dy, t: badge.transform, s: 1.0 / badge.ds} };
  }

  initSvgMap() {
    this.shared.getHtmlResource(this.svgmap.svg).then(svg => {
      let parser = new DOMParser();
      this.svg = parser.parseFromString(svg, 'text/xml');
      if (this.svgmap.background) {
        this.background = new BadgeMapItem(this.svgmap.id, this.svg.getElementById(this.svgmap.background));
      }
      this.areas = this.svgmap.ids
      .map(id => new BadgeMapItem(id, this.svg.getElementById(id)))
      .map(item => item.checkBadge(this.shared))
      .filter(area => area.element);
      if (this.route.snapshot.paramMap.get('id')) {
        let move: BadgeMapItem[] = [];
        this.areas
        .filter(a => a.id === this.route.snapshot.paramMap.get('id'))
        .forEach(a => {
          a.state = 'full';
          move.push(a);
        });
        move.forEach(area => {
          this.moveForward(area);
        });
      };
  
    });
  }

  xml(area: BadgeMapItem): string {
    let x = this.serializer.serializeToString(area.element);
    return x.replace('href="./', `href="${environment.gameUrl}/`);
  }

  private moveForward(area: BadgeMapItem) {
    this.areas.splice(this.areas.indexOf(area), 1);
    this.areas.push(area);
  }

  clickArea(area: BadgeMapItem) {
    area.state = area.state === 'mini' ? 'full' : 'mini';
    this.moveForward(area);
  }

}

export class BadgeMapItem {

  state: string;
  id: string;
  element: HTMLElement;
  transform: string;
  style: string;
  dx: number;
  dy: number;
  ds: number;

  constructor(id: string, element: HTMLElement) {
    this.id = id;
    this.element = element;
    this.state = 'mini';
    this.transform = this.element.getAttribute('transform');
    if (this.transform) {
      this.captureTranslate();
      this.captureMatrix();
    }
    console.log(this);
  }

  checkBadge(shared: SharedDataService): BadgeMapItem {
    this.style = shared.play.badges.includes(this.id) ? 'present': 'missing';
    return this;
  }

  captureTranslate() {
    let r = /translate\(([0-9\.]+),([0-9\.]+)\)/;
    let m = this.transform.match(r);
    if (m) {
      this.ds = 0.15;
      this.dx = Number(m[1]);
      this.dy = Number(m[2]);
    }
  }

  captureMatrix() {
    let r = /matrix\([0-9\.]+,[0-9\.]+,[0-9\.]+,([0-9\.]+),([0-9\.]+),([0-9\.]+)\)/;
    let m = this.transform.match(r);
    if (m) {
      this.ds = Number(m[1]); 
      this.dx = Number(m[2]);
      this.dy = Number(m[3]);
    }
  }

}