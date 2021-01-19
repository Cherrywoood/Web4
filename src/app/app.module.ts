import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnDestroy} from '@angular/core';
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
import { SvgComponent } from './components/svg/svg.component';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeRu);
registerLocaleData(localeEn);
registerLocaleData(localeEs);

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
        allowedDomains: ['localhost:11600'],
        disallowedRoutes: ['http://localhost:4200/login'],
        skipWhenExpired: true
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{
}

