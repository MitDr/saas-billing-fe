import {Component, computed, input} from '@angular/core';
import {EChartsOption} from 'echarts';
import {MrrResponse} from '../../../../core/interface/response/statistic/mmr-response';
import {NgxEchartsDirective, NgxEchartsModule} from 'ngx-echarts';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzSpinComponent} from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-mrr-chart',
  imports: [
    NgxEchartsDirective,
    NzCardComponent,
    NzSpinComponent,
    NgxEchartsModule
  ],
  templateUrl: './mrr-chart.html',
  styleUrl: './mrr-chart.css',
})
export class MrrChart {
  data = input.required<MrrResponse[]>();
  loading = input<boolean>(false);

  chartOptions = computed<EChartsOption>(() => {
    const mrrData = this.data() ?? [];

    if (mrrData.length === 0) {
      return {
        title: {text: 'No MRR data available', left: 'center', top: 'center'},
        xAxis: {show: false},
        yAxis: {show: false},
        series: []
      };
    }

    const formatUSD = (value: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);

    const sortedData = [...mrrData].reverse();

    const months = sortedData.map(d => d.month);
    const values = sortedData.map(d => (parseFloat(d.mrr) || 0) / 100);

    return {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          if (!params || params.length === 0) return '';

          const item = params[0];
          const value = item.value as number | undefined;

          if (value == null) return item.name;

          return `${item.name}<br/>MRR: ${formatUSD(value)}`;
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: months,
        axisLabel: {
          rotate: 45,
          fontSize: 12,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: 'MRR ($)',
        axisLabel: {formatter: '${value}'}
      },
      series: [{
        name: 'MRR',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: values,
        itemStyle: {color: '#52c41a'},
        areaStyle: {color: 'rgba(82, 196, 26, 0.2)'},
        label: {
          show: true,
          position: 'top',
          formatter: (params: any) => {
            const value = params.value as number | undefined;
            return value != null ? formatUSD(value) : '';
          },
          fontSize: 12
        }
      }]
    };
  });
}
