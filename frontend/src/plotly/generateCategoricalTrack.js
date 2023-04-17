
/*
Input

track object

{
  track: {
    data: { sample: val },
    clinical: bool,
    clinicalData: {
      group: str
      numerical: bool
      show: bool,
      trackDetails: [
        { 
          color: str
          label: str || num
          show: bool
          value: num
        }
      ]
    }
    ...
  }
}
*/

/*
Output

Plotly trace group object (group of tracks)

{
    x: [...samples],
    y: [track],
    z: [...colorKeys],
    type: 'heatmap',
    colorscale,
    zmin,
    zmax,
    showscale: false,
    connectgaps: false,
    hoverongaps: true,
    autocolorscale: false,
}
 */

export default function generateCategoricalTrack(
  {
    sampleOrder,
    track
  }) 
  {
    let labelValue = {}
    let labelColor = {}

    track.clinicalData.trackDetails.forEach((trackEntry) => {
      if (trackEntry.value) {
        labelValue[trackEntry.label] = trackEntry.value
        labelColor[trackEntry.label] = trackEntry.color
      }
    })

    const z = sampleOrder.map(sample => 
      labelValue[track.data[sample]]
    )

    return {
      x: [...sampleOrder],
      y: [ track.title ],
      z: [z],
      type: 'heatmap',
      connectgaps: false,
      hoverongaps: true,
      autocolorscale: false,
      // hovertemplate: `%{y}: %{z}<extra></extra>`,
      showscale: false,
      colorscale: Object
        .values(labelColor)
        .map((color, i) => {
            const opts = Object.keys(labelColor).length - 1
            return [i/opts, color]
        }),
      zmax: Math.max(...Object.values(labelValue)),
      zmin: Math.min(...Object.values(labelValue)),
    }
}
