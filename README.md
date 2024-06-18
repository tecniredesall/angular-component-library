# GrainChain Angular Component Library

This project contains a reusable web components that can be implemented in any Angular application.

\
&nbsp;

## Installation

1. Install peerDependencies for library in your Angular application
    - *[Sentry for Angular](https://docs.sentry.io/platforms/javascript/guides/angular/)*

      ```shell
      npm install --save @sentry/angular @sentry/tracing
      ```

    - *[The internationalization (i18n) library for Angular](https://github.com/ngx-translate/core)*

      ```shell
      npm install --save @ngx-translate/core

      npm install --save @ngx-translate/http-loader
      ```

    - *[Material Design components for Angular](https://material.angular.io/)*

      ```shell
      ng add @angular/material@12.2.13
      ```

    - *[Component Dev Kit (CDK)](https://material.angular.io/cdk/categories)*

      ```shell
      npm install --save-exact @angular/cdk@12.2.13
      ```

    - *[Text Mask Addons](https://www.npmjs.com/package/text-mask-addons)*

      ```shell
      npm install --save-exact @text-mask-addons@3.8.0
      ```

2. Create in the root folder of your Angular application a file named `.npmrc` with the following content

    ```shell
    @gc-crm:registry=http://nexus.grainchain.io/repository/crm/
    ```

3. Install the latest library version

    ```shell
    npm install --save @gc-crm/gc-component-lib
    ```

4. Include library styles

    In the `angular.json` under key `architect.build.options.assets` and key `architect.build.options.styles` add the assets folder of the library

    ```json
    {
      ...
      "architect": {
          "build": {
            ...
            "options": {
              ...
              "assets": [
                ...
                {
                  "glob": "**/*",
                  "input": "./node_modules/@gc-crm/gc-component-lib/gc-cl-assets",
                  "output": "/gc-cl-assets"
                }
              ],
              "styles": [
                "./node_modules/@gc-crm/gc-component-lib/gc-cl-assets/styles.scss",
                ...
              ]
              ...
            }
            ...
          }
          ...
      }
      ...
    }
   ```

5. Include library translations

    - Install `MultiTranslateHttpLoader`

      ```shell
      npm install --save ngx-translate-multi-http-loader@7.0.1
      ```

    - In the `app.module.ts` file change `TranslateHttpLoader` to `MultiTranslateHttpLoader` and import the project and library translation files

      ```typescript
      import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
      import { HttpClient } from '@angular/common/http';
      import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
      ...

      @NgModule({
        ...
        imports: [
          ...
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
            },
          }),
        ]
      })
      export class AppModule {}
      ...

      export function HttpLoaderFactory(http: HttpClient): MultiTranslateHttpLoader {
        return new MultiTranslateHttpLoader(http, [
          ...
          { prefix: './gc-cl-assets/i18n-gc-cl/', suffix: '.json' },
        ]);
      }
      ```

\
&nbsp;

## Usage

- Import the selected module (use `GCCLExampleModule` as example)
  
  ```typescript
  ...
  @NgModule({
    ...
    declarations: [
      ContainerExampleComponent,
      ...
    ],
    imports: [
      GCCLExampleModule,
      ...
    ],
  })
  export class ContainerExampleModule {}
  ```

- Add component to template (use `GCCLExampleTextComponent` as example)
  
  ```html
  <gc-cl-example-text></gc-cl-example-text>
  ```

\
&nbsp;

## Library development server

Run `npm run lib:dev` for a dev library server. The library will automatically rebuild if you change any of the source files.

\
&nbsp;

## App development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

\
&nbsp;

## Build library

Run `npm run lib` to build the library. The build artifacts will be stored in the `dist/gc-crm/gc-component-lib` directory.

\
&nbsp;

## Build app

Run `ng build` to build the app. The build artifacts will be stored in the `dist/` directory.

\
&nbsp;

## Install library in this app

Run `npm run install-lib:local` to install the library in local app. This create a symlink to the `dist/gc-crm/gc-component-lib` directory.

\
&nbsp;

## Publish a library version

Change the library number version in the file `projects/gc-crm/gc-component-lib/package.json` and after it, run `npm run publish-lib`. This publish a new library version in *[Nexus Repository Manager](http://nexus.grainchain.io/#browse/browse:crm:%40gc-crm%2Fgc-component-lib)*
