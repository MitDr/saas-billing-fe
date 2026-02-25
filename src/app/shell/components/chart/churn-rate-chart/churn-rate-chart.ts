import {Component, computed, input} from '@angular/core';
import {EChartsOption} from 'echarts';
import {ChurnRateResponse} from '../../../../core/interface/response/statistic/churn-rate-response';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzStatisticComponent} from 'ng-zorro-antd/statistic';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzProgressComponent} from 'ng-zorro-antd/progress';
import {NgxEchartsDirective, NgxEchartsModule} from 'ngx-echarts';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-churn-rate-chart',
  imports: [
    NzCardComponent,
    NzStatisticComponent,
    NzSpinComponent,
    NzProgressComponent,
    NgxEchartsDirective,
    NgxEchartsModule,
    NzIconDirective
  ],
  templateUrl: './churn-rate-chart.html',
  styleUrl: './churn-rate-chart.css',
})
export class ChurnRateChart {
  data = input.required<ChurnRateResponse>();
  // period = input<number>(12);
  // churnRate = input<number>(0); // Tổng churn rate (0.02083)
  loading = input<boolean>(false);

  // chartOptions = computed<EChartsOption>(() => {
  //   const chartData = this.data()?.data;
  //
  //   return {
  //     tooltip: {
  //       trigger: 'axis',
  //       formatter: '{b}<br/>Churn Rate: {c}%'
  //     },
  //     grid: {
  //       left: '5%',
  //       right: '5%',
  //       bottom: '15%',
  //       containLabel: true
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: chartData.map(d => d.month),
  //       axisLabel: { rotate: 45, fontSize: 12, interval: 0 }
  //     },
  //     yAxis: {
  //       type: 'value',
  //       name: 'Churn Rate (%)',
  //       max: 100,
  //       axisLabel: { formatter: '{value}%' }
  //     },
  //     series: [{
  //       name: 'Churn Rate',
  //       type: 'bar',
  //       data: chartData.map(d => d.churnRate * 100), // chuyển sang %
  //       itemStyle: { color: '#f5222d' }, // đỏ để cảnh báo
  //       label: {
  //         show: true,
  //         position: 'top',
  //         formatter: '{c}%'
  //       }
  //     }]
  //   };
  // });
  chartOptions = computed<EChartsOption>(() => {
    // const chartData = ;

    const chartData = [...this.data()?.data ?? []].reverse();
    if (chartData.length === 0) {
      return {
        title: { text: 'No Churn Rate data available', left: 'center', top: 'center' },
        xAxis: { show: false },
        yAxis: { show: false },
        series: []
      };
    }

    return {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>Churn Rate: {c}%'
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: chartData.map(d => d.month),
        axisLabel: { rotate: 45, fontSize: 12, interval: 0 }
      },
      yAxis: {
        type: 'value',
        name: 'Churn Rate (%)',
        max: 100,
        axisLabel: { formatter: '{value}%' }
      },
      series: [{
        name: 'Churn Rate',
        type: 'bar',
        data: chartData.map(d => (d.churnRate ?? 0) * 100),
        itemStyle: { color: '#f5222d' },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      }]
    };
  });
}
