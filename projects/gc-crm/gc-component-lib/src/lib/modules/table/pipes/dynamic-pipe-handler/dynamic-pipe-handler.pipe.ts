/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injector, Pipe, PipeTransform } from '@angular/core';
import { DYNAMIC_PIPES } from '../../constants/dynamic-pipes/dynamic-pipes.constant';
import { Observable } from 'rxjs';

@Pipe({
  name: 'dynamicPipeHandler',
})
export class DynamicPipeHandlerPipe implements PipeTransform {
  constructor(private injector: Injector) {}

  transform(item: any, pipeName: string, pipeExtraArgs: any): string {
    try {
      const selectedPipe = DYNAMIC_PIPES[pipeName];
      const injector = Injector.create({
        name: 'DynamicPipe',
        parent: this.injector,
        providers: [
          {
            provide: selectedPipe,
          },
        ],
      });
      const pipe = injector.get(selectedPipe);
      return pipe.transform(item, pipeExtraArgs);
    } catch (e) {}
    return item[pipeExtraArgs?.columnKey];
  }
}

@Pipe({
  name: 'dynamicAsyncPipeHandler',
})
export class DynamicAsyncPipeHandlerPipe implements PipeTransform {
  constructor(private injector: Injector) {}

  transform(
    item: any,
    pipeName: string,
    pipeExtraArgs: any
  ): Promise<unknown> | Observable<unknown> {
    try {
      // @ts-ignore
      const selectedPipe = DYNAMIC_PIPES[pipeName];
      const injector = Injector.create({
        name: 'DynamicPipe',
        parent: this.injector,
        providers: [
          {
            provide: selectedPipe,
          },
        ],
      });
      const pipe = injector.get(selectedPipe);
      return pipe.transform(item, pipeExtraArgs);
    } catch (e) {}
    return item[pipeExtraArgs?.columnKey];
  }
}
