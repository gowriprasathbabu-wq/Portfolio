import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

const config = mergeApplicationConfig(appConfig, serverConfig);

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, config, context);

export default bootstrap;
