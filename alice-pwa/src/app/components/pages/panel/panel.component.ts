import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';
import { ActivatedRoute } from '@angular/router';
import { AudioPlayService } from 'src/app/services/audio-play.service';

function tunnel(event: Event) {
  let a: ClickableClickEvent = this;
  a.event = event;
  a.component.clickableClick(a);
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  svgmap: SvgMap;
  svg: Document;

  serializer: XMLSerializer;

  @ViewChild("svgRoots") svgRoots: ElementRef;

  constructor(
    private shared: SharedDataService,
    private route: ActivatedRoute,
    private audio: AudioPlayService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.serializer = new XMLSerializer();
    this.route.params.subscribe(params => {
      this.svgmap = this.shared.getSvgMap(params['id'] ? params['id'] : 'main-panel');
      this.initSvgMap();
    });
  }

  initSvgMap() {
    this.shared.getHtmlResource(this.svgmap.svg).then(svg => {
      let parser = new DOMParser();
      this.svg = parser.parseFromString(svg, 'text/xml');
      let roots = this.svg.getElementsByClassName('svg-root');
      if (roots.length > 0) {
        this.initWithRoots(roots);
      }
    });
  }

  initWithRoots(roots: HTMLCollectionOf<Element>) {
    console.log(this.svgRoots);
    for (let index = 0; index < roots.length; index++) {
      const root = roots.item(index);
      console.log(index, root);
      this.renderer.appendChild(this.svgRoots.nativeElement, root);
      let clickables = root.getElementsByClassName('clickable');
      for (let i = 0; i < clickables.length; i++) {
        let clickable = clickables.item(i);
        clickable.addEventListener('click', (tunnel).bind(new ClickableClickEvent(this, clickable, root)));
      }
    }
  }

  clickableClick(event: ClickableClickEvent) {
    console.log('clickable clicked!', event);
    let name = event.clickable.getAttribute('name');
    this.audio.play('action');
    if (event.clickable.classList.contains('trigger') && name) {
      this.shared.triggerAction(`trigger:${name}`);
    }
  }

}

class ClickableClickEvent {
  component: PanelComponent;
  clickable: Element;
  root: Element;
  event: Event;
  constructor (component: PanelComponent, clickable: Element, root: Element) {
    this.component = component;
    this.clickable = clickable;
    this.root = root;
  }
}