import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {icons} from './icons-provider';
import {provideNzIcons} from 'ng-zorro-antd/icon';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideEchartsCore} from 'ngx-echarts';
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';
echarts.use([BarChart, GridComponent, CanvasRenderer, TooltipComponent, LineChart, TitleComponent]);

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    provideEchartsCore({echarts})
    // provideClientHydration(withEventReplay()), ,
  ]
};
