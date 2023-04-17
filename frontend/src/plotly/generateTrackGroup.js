
/*
Input

track object

{
  track: {
    title: str,
    data: { sample: val },
    clinical: false,
    clinicalData: null,
    gene: str,
    dataType: str,
    tissue: str ('normal' || 'tumor'),
  },
}
*/


/*
Output

Plotly trace group object (group of tracks)

{
    x: [...samples],
    y: [...track],
    z: [...zScores],
    type: 'heatmap',
    hovertemplate: zScoreHoverTemplate,
    colorscale: colorscaleValueZscore,
    showscale: true,
    connectgaps: false,
    hoverongaps: true,
    autocolorscale: false,
    zmin:-3,
    zmax:3,
    colorbar: {
      title: '<b>zscore</b>',
        x: 1.00,
        thickness: 10,
        side: 'bottom',
    },
    title: 'zscore'
}
 */


export default function generateTrack({
  sampleOrder,
  track,
  i,
}) {
  const z = sampleOrder.map(sample => 
    track.data[sample]
  )

  return {
      x: [...sampleOrder],
      y: [ track.title ],
      z: [ z ],
      type: 'heatmap',
      colorscale: [
        [0.0, '#002CFE'],
        [1.0, '#FFFF00'],
      ],
      connectgaps: false,
      hoverongaps: true,
      hovertemplate: `%{y}<extra></extra>`,
      autocolorscale: false,
      hoverinfo:'text',
      zmin: -3,
      zmax: 3,
      colorbar: {
        title: '<b>z-score</b>',
        xref: 'paper',
        yref: 'paper',
        x: 1.01,
        y: 0.5,
        thickness: 10,
        side: 'bottom',
        len: 220,
        lenmode: 'pixels',
      },
      showscale: i === 0,
    }
}
