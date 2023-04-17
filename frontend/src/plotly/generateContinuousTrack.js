
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

export default function generateContinuousTrack(
  {
    sampleOrder,
    track
  }) 
  {
    // let k_sample_v_val = {}
    // sampleOrder.forEach((sample) => {
    //   k_sample_v_val[sample] = sampleMeta[sample][track]
    // })

    const z = sampleOrder.map(sample => 
      track.data[sample]
    )

    return {
      x: [...sampleOrder],
      y: [ track.title ],
      z: [ z ],
      type: 'heatmap',
      connectgaps: false,
      hoverongaps: true,
      autocolorscale: true,
      hovertemplate: `%{y}<extra></extra>`,
      showscale: false,
      // zmax: Math.max(...Object.values(k_sample_v_val)),
      // zmin: Math.min(...Object.values(k_sample_v_val)),
    }
}

// export default function generateContinuousTrackGroup({
//   sampleOrder,
//   sampleMeta,
//   numericalTracks,
// }) {
//   return numericalTracks
//     .map((track) => {
//       return generateContinuousTrack({
//         sampleOrder,
//         sampleMeta,
//         track,
//       })
//     })
// }