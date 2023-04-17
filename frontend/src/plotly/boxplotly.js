import ttest from 'ttest'


export default function generateBoxplot({
  divId,
  track,
  trackData,
  dataKeys,
  stratifyBy,
  useZScore,
}) {    
    if (!trackData) { return }

    const Plotly = window.Plotly

    let groupA = trackData[dataKeys[0]]
    let groupB = trackData[dataKeys[1]]

    if (!groupA || !groupB) { return }

    let groupASamples = Object.keys(groupA.data)
    let groupBSamples = Object.keys(groupB.data)

    groupASamples.sort()
    groupBSamples.sort()

    let trace1 = {
      y: groupASamples.map(s => groupA.data[s]),
      name: groupA.tissue,
      marker: {
        color: '#FF4136'
      },
      type: 'box',
      boxpoints: 'all',
      jitter: 0.4,
      pointpos: 0,
    }

    let trace2 = {
      y:  groupBSamples.map(s => groupB.data[s]),
      name: groupB.tissue,
      marker: {
        color: '#3D9970'
      },
      type: 'box',
      boxpoints: 'all',
      jitter: 0.4,
      pointpos: 0,
    }
    
    const suffixes = {
      'rna': 'TPM',
      'phospho': 'Log2 intensity',
      'proteo': 'Log2 intensity',
      'glyco_glyco': 'Log2 intensity',
      'phospho_glyco': 'Log2 intensity',
  }
    const dataType = track.split(' ')[1]    

    let layout = {
      title: track,
      yaxis: {
        title: useZScore ? 'z-score' : suffixes[dataType],
        zeroline: false,
      },
      xaxis: {
        title: stratifyBy ? stratifyBy : 'tissue',
      },
      boxmode: stratifyBy ? 'group' : '',
    };

    if (stratifyBy) {
      let groupAStratifyLabels = groupASamples.map(s => trackData[stratifyBy].data[s])
      let groupBStratifyLabels = groupBSamples.map(s => trackData[stratifyBy].data[s])
  
      trace1.x = groupAStratifyLabels
      trace2.x = groupBStratifyLabels
      
      const categories = trackData[stratifyBy].clinicalData.trackDetails.map(el => el.label)
      layout.xaxis.categoryarray = categories

      let annotations = []

      categories.forEach(category => {
        let groupACategorySamples = groupASamples.filter(s => trackData[stratifyBy].data[s] === category)
        let groupBCategorySamples = groupBSamples.filter(s => trackData[stratifyBy].data[s] === category)

        let groupACategoryValues = groupACategorySamples.map(s => groupA.data[s]).filter(el => el)
        let groupBCategoryValues = groupBCategorySamples.map(s => groupB.data[s]).filter(el => el)

        let pValue = ttest(groupACategoryValues, groupBCategoryValues).pValue().toExponential().toString()

        if (pValue.includes('e')) {
          const pValArr = pValue.split('e')
          const val = pValArr[0].slice(0,4)
          const exp = pValArr[1]
          pValue = `${val}e${exp}`
        }

        annotations.push({
          x: category,
          y: 1.1,
          xref: 'x',
          yref: 'paper',
          text: pValue.includes('NaN') ? '' : `pValue:<br>${pValue}`,
          showarrow: false,
        })

        layout.annotations = annotations
      })
    } else {
      let groupAValues = trace1.y.filter(el => el)
      let groupBValues =  trace2.y.filter(el => el)

      let pValue = ttest(groupAValues, groupBValues).pValue().toExponential().toString()
      if (pValue.includes('e')) {
        const pValArr = pValue.split('e')
        const val = pValArr[0].slice(0,4)
        const exp = pValArr[1]
        pValue = `${val}e${exp}`
      }
      layout.annotations = [
        {
          x: 0.5,
          y: 1.1,
          xref: 'paper',
          yref: 'paper',
          text: `pValue: ${pValue}`,
          showarrow: false,
        }
      ]
    }

    var data = [trace1, trace2]

    let config = {
      responsive: true,
    }

    Plotly.newPlot(divId, data, layout, config);
}