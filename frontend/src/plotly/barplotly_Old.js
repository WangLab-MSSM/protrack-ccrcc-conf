import modebar from './layout/modebar'
import categoryTracks from '../refs/categoryTracks'

export default function generateBarplot(
    {
        track,
        divId,
        trackDetails,
        sampleMeta,
        // xAxisCategory,
        // showText,
    }
) {
    const Plotly = window.Plotly

    const mutationTracks = categoryTracks.Mutation

    let k_xValue_v_samples = {}

    Object.entries(sampleMeta).forEach(([sample, meta]) => {
        const xValue = meta[track]
        if (!(xValue in k_xValue_v_samples)) { k_xValue_v_samples[xValue]  = [] }
        k_xValue_v_samples[xValue].push(sample)
    })

    console.log('k_xValue_v_samples', k_xValue_v_samples)

    let trace = {
        x: [],
        y: [],
        marker:{
            color: [],
        },
        name: track,
        type: 'bar',
    }

    trackDetails.forEach((track) => {
        trace.x.push(track.label)
        trace.marker.color.push(
            track.color.toLowerCase() === '#ffffff' ?
            '#ebebeb' :
            track.color
        )
        const samples = k_xValue_v_samples[track.label]
        trace.y.push(samples.length)
    })
      
    const data = [
          trace, 
      ]

    console.log('data? ', data)
      
    const layout = {
        autosize: true,
        margin: {
            l: 50,
            r: 50,
            b: 150,
            t: 100,
            pad: 4
          },
        title: {
            text: mutationTracks.includes(track) ? `${track} Mutation` : track,
        },
        xaxis: {
            autotick: false,
        },
    };
    
    const percentageView = true

    if (percentageView) {
        data.forEach(trace => {
            const total = trace.y.reduce((partialSum, a) => partialSum + a, 0)
            const y = trace.y.map(el => el / total * 100)
            trace.y = y
        })   
    }

    const config = {
        responsive: true,
        displaylogo: false,
    }
    Plotly.newPlot(divId, data, layout, config)
}