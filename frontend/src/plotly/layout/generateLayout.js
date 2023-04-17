import xAxis from './xAxis'
import yAxis from './yAxis'
import modebar from './modebar'

export default function generateLayout(data) {
  const yAxisLabels = data.map(el => el.y).flat()
  return {
            xaxis: xAxis(),
            yaxis: yAxis(),
            autosize: true,
            width: 900,
            margin: {
                l: 152,
                t: 1,
                b: 0,
                // l: Math.max(...yAxisLabels.map(y => y.length)) * 8,
                // r: 50,
            },
            height: yAxisLabels.length * 15 ,
            showlegend: true,
            legend: {
                traceorder: 'normal',
                font: {
                    family: 'sans-serif',
                    size: 12,
                    color: '#000'
                },
                bgcolor: '#E2E2E2',
                bordercolor: '#FFFFFF',
                borderwidth: 2,
                "orientation": "h",
            },
            font: {
                size: 12,
                color: '#000000'
            },
            modebar: modebar.heatmap,
        };
}