import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { TableComponent} from './components/table/table.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import {SliderModule} from 'primeng/slider';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { HeaderComponent } from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { SvgComponent } from './components/svg/svg.component';
import {JwtModule} from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    StartPageComponent,
    FormComponent,
    TableComponent,
    NotFoundComponent,
    AuthenticationFormComponent,
    HeaderComponent,
    SvgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/login'],
        skipWhenExpired: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

