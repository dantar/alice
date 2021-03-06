import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckInComponent } from './components/pages/check-in/check-in.component';
import { ButtonsOverlayComponent } from './components/pages/buttons-overlay/buttons-overlay.component';
import { DiarioComponent } from './components/pages/diario/diario.component';
import { MappaComponent } from './components/pages/mappa/mappa.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ListenTrackComponent } from './components/widgets/listen-track/listen-track.component';
import { TellStoryComponent } from './components/pages/tell-story/tell-story.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WatchVideoComponent } from './components/widgets/watch-video/watch-video.component';
import { HttpClientModule } from '@angular/common/http';
import { StoryPopupComponent } from './components/pages/story-popup/story-popup.component';
import { BadgeComponent } from './components/pages/badge/badge.component';
import { ReadStoryComponent } from './components/widgets/read-story/read-story.component';
import { OptionPopupComponent } from './components/pages/option-popup/option-popup.component';
import { SvgMapComponent } from './components/pages/svg-map/svg-map.component';
import { SafePipe } from './pipes/safe.pipe';
import { ShineComponent } from './components/animations/shine/shine.component';
import { QrCodePopupComponent } from './components/pages/qr-code-popup/qr-code-popup.component';
import { BadgeMapComponent } from './components/pages/badge-map/badge-map.component';
import { FullscreenToggleComponent } from './components/widgets/fullscreen-toggle/fullscreen-toggle.component';
import { FaceChallengeComponent } from './components/pages/face-challenge/face-challenge.component';
import { ChallengeViewDirective } from './directives/challenge-view.directive';
import { ChallengeFindFeaturesComponent } from './components/pages/challenge-find-features/challenge-find-features.component';
import { SvgCanvasComponent } from './components/widgets/svg-canvas/svg-canvas.component';
import { SvgAreaComponent } from './components/widgets/svg-area/svg-area.component';
import { InlineStyleComponent } from './components/widgets/inline-style/inline-style.component';
import { ChallengeIdentikitComponent } from './components/pages/challenge-identikit/challenge-identikit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CameraComponent } from './components/pages/camera/camera.component';
import { RotateScreenComponent } from './components/pages/rotate-screen/rotate-screen.component';
import { CreditsComponent } from './components/pages/credits/credits.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { DirectTriggerComponent } from './components/pages/direct-trigger/direct-trigger.component';

import { FormsModule } from '@angular/forms';
import { GameurlPipe } from './pipes/gameurl.pipe';
import { PanelComponent } from './components/pages/panel/panel.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent,
    ButtonsOverlayComponent,
    DiarioComponent,
    MappaComponent,
    ListenTrackComponent,
    TellStoryComponent,
    WatchVideoComponent,
    StoryPopupComponent,
    BadgeComponent,
    ReadStoryComponent,
    OptionPopupComponent,
    SvgMapComponent,
    SafePipe,
    ShineComponent,
    QrCodePopupComponent,
    BadgeMapComponent,
    FullscreenToggleComponent,
    FaceChallengeComponent,
    ChallengeViewDirective,
    ChallengeFindFeaturesComponent,
    SvgCanvasComponent,
    SvgAreaComponent,
    InlineStyleComponent,
    ChallengeIdentikitComponent,
    CameraComponent,
    RotateScreenComponent,
    CreditsComponent,
    PrivacyPolicyComponent,
    DirectTriggerComponent,
    GameurlPipe,
    PanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
