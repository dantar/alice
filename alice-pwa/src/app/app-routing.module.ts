import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './components/pages/check-in/check-in.component';
import { DiarioComponent } from './components/pages/diario/diario.component';
import { MappaComponent } from './components/pages/mappa/mappa.component';
import { BadgeComponent } from './components/pages/badge/badge.component';
import { TellStoryComponent } from './components/pages/tell-story/tell-story.component';
import { SvgMapComponent } from './components/pages/svg-map/svg-map.component';
import { PartitaComponent } from './components/pages/partita/partita.component';
import { QrCodePopupComponent } from './components/pages/qr-code-popup/qr-code-popup.component';
import { BadgeMapComponent } from './components/pages/badge-map/badge-map.component';
import { CameraComponent } from './components/pages/camera/camera.component';
import { CreditsComponent } from './components/pages/credits/credits.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { PanelComponent } from './components/pages/panel/panel.component';


const routes: Routes = [
  {path: '', component: CheckInComponent},
  {path: 'diario', component: DiarioComponent},
  {path: 'mappa', component: MappaComponent},
  {path: 'gui/:id', component: SvgMapComponent},
  {path: 'gui/:id/:item', component: SvgMapComponent},
  {path: 'svgmap/:id', component: SvgMapComponent},
  {path: 'badge', component: BadgeComponent},
  {path: 'badgemap/:id/:badge', component: BadgeMapComponent},
  {path: 'badgemap/:id', component: BadgeMapComponent},
  {path: 'badgemap', component: BadgeMapComponent},
  {path: 'panel/:id', component: PanelComponent},
  {path: 'qrcode', component: QrCodePopupComponent},
  {path: 'qrcode/:id', component: QrCodePopupComponent},
  {path: 'on/:on/qrcode', component: QrCodePopupComponent},
  {path: 'on/:on/qrcode/:id', component: QrCodePopupComponent},
  {path: 'camera', component: CameraComponent},
  {path: 'partita', component: PartitaComponent},
  {path: ':key/story', component: TellStoryComponent},
  {path: 'credits', component: CreditsComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
