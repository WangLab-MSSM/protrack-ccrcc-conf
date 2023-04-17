export default function generateBarplot(
    {
        track,
        divId,
        percentView,
        sampleMeta,
        trackDetails,
    }
) {
    const Plotly = window.Plotly

    let data = []

    const ccRCCAll = getCCRCC({ 
        sampleMeta, 
    }).length
    const nonCCRCCAll = getnonCCRCC({ 
        sampleMeta, 
    }).length
    const totalAll = ccRCCAll + nonCCRCCAll

    trackDetails[track].forEach((category) => {
        const categoryLabel = category.label
        const ccRCC = getCohortCCRCC({ 
            sampleMeta, 
            track, 
            categoryLabel,
        }).length
        const nonCCRCC = getCohortnonCCRCC({ 
            sampleMeta, 
            track, 
            categoryLabel,
        }).length
        
        const total = ccRCC + nonCCRCC

        let yValue, yValueText

        if (percentView) {
            yValue = [
                Math.round(total/totalAll * 100), 
                Math.round(ccRCC/ccRCCAll * 100), 
                Math.round(nonCCRCC/nonCCRCCAll * 100)
            ]
            yValueText = yValue.map(el => `${el} %`)
        } else {
            yValue = [
                total,
                ccRCC,
                nonCCRCC,
            ]
            yValueText = yValue.map(el => `${el}`)
        }
        let trace = {
            x: ['total', 'ccRCC', 'nonCCRCC'],
            y: yValue,
            text: yValueText,
            name: categoryLabel,
            type: 'bar',
            marker: {
                color: category.color
            }
          }

        data.push(trace)
    })
      
    data.reverse()

    var layout = {
        width: 340,
        barmode: 'stack',
        title: track,
        legend: {
            orientation: 'v',
            // traceorder: 'reversed',
        },
        margin: {
            autoexpand: false,
            t: 50,
            r: 150,
        }
    }
      
    Plotly.newPlot(divId, data, layout);
}

function getCohortCCRCC({ sampleMeta, track, categoryLabel }) {
    return Object.entries(sampleMeta)
        .filter(([, meta]) =>  meta.tumorClass === 'ccRCC' && 
            meta[track] === categoryLabel)
        .map(([sample, ]) => sample)
}

function getCohortnonCCRCC({ sampleMeta, track, categoryLabel }) {
    return Object.entries(sampleMeta)
        .filter(([, meta]) =>  meta.tumorClass !== 'ccRCC' 
            && meta[track] === categoryLabel)
        .map(([sample, ]) => sample)
}

function getCCRCC({ sampleMeta }) {
    return Object.entries(sampleMeta)
        .filter(([, meta]) =>  meta.tumorClass === 'ccRCC')
        .map(([sample, ]) => sample)
}

function getnonCCRCC({ sampleMeta }) {
    return Object.entries(sampleMeta)
        .filter(([, meta]) =>  meta.tumorClass !== 'ccRCC')
        .map(([sample, ]) => sample)
}