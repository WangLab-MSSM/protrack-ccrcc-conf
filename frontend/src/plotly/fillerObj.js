export default function fillerObj({ i, samples, marker }) { 
    return {
        x: samples,
        y: [marker.repeat(i)],
        z: [new Array(samples.length).fill(0)],
        type: 'heatmap',
        showscale: false,
        connectgaps: false,
        hoverongaps: false,
        autocolorscale: false,
        colorscale: [
            [0, 'rgba(214, 39, 40, 0.85)'],
            [0.5, 'rgba(255, 255, 255, 0.85)'],
            [1, 'rgba(6,54,21, 0.85)']
        ],
        zmax: 0,
        zmin: 1,
    }
}