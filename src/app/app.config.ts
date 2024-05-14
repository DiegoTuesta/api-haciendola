import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorResponseInterceptor } from './interceptor/error-response';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from './interceptor/token-request';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideAnimationsAsync(),
    // importProvidersFrom(HttpClientModule)
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptors([
      ErrorResponseInterceptor,
      AuthInterceptor
    ])), provideAnimationsAsync()
  ]
};
