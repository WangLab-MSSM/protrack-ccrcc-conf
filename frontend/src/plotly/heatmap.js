// import categoryTracks from "../refs/categoryTracks"
import fillerObj from "./fillerObj"
import generateCategoricalTrack from "./generateCategoricalTrack"
import generateContinuousTrack from "./generateContinuousTrack"
import generateLayout from "./layout/generateLayout"
import generateTrack from "./generateTrackGroup"

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

export default function generateHeatmap(
    {
        categoryTracks,
        genes,
        trackData,
        trackGroup,
        sampleOrder,
        shownDataTypes,
    }
  ) {
    const Plotly = window.Plotly
    // console.log('track: ', trackGroup, trackData)
    let data = []
    // categorical clinical tracks
    // Object.entries(categoryTracks)
    //   .forEach(([category, trackList], i) => {
    //       if (category === 'Numerical') { return }
    if (trackGroup in categoryTracks && trackGroup !== 'Numerical') {
      const trackList = categoryTracks[trackGroup]

      addCategoryTrack({
        trackList,
        dataArr: data,
        trackData,
        sampleOrder,
        i: 0,
      })
    }
    // })

    // continuous clinical tracks
    if (trackGroup === 'Numerical') {
      categoryTracks.Numerical.forEach((track, i) => {
        const continuousTrack = generateContinuousTrack({
          sampleOrder,
          track: trackData[track],
        })
  
        data.push(continuousTrack)
      })
  
  
      // data.push(fillerObj({
      //   i: 1,
      //   samples: sampleOrder,
      //   marker: '*',
      // }))
    }

    // molecular tracks
    // genes.forEach((gene, y) => {
    if (trackGroup === 'Ungrouped') {
      genes.forEach((gene, y) => {
        const setCategories = Object.values(categoryTracks).flat()
            const geneTracks = Object.keys(trackData).filter(track => !setCategories.includes(track))
            
          })
    }

    console.log('trackGroup? ', genes, trackGroup)

    if (genes.includes(trackGroup)) {
      console.log('trackGroup? ', genes, trackGroup)
      const gene = trackGroup
      const geneTracks = Object.entries(trackData)
      .filter(([, data]) => data.gene === gene && 
        shownDataTypes.includes(data.dataType) 
      )
      
      // can include shown data types here
      geneTracks.forEach(([, track], i) => {
        const geneTrack = generateTrack({
          sampleOrder,
          track,
          i: 1,
        })
        data.push(geneTrack)
      })
    }

    data.reverse()

    // just needed for some mysterious plotly reason
    data.forEach((track) => {
      if (track) {
          track.z.splice(0,0,[])
          track.y.splice(0,0,'')
          track.xgap = 0.2
      }
    })

    // layout and config
    const layout = generateLayout(data)
    
    const config = { 
      repsonsive: true,
      displaylogo: false,
    }

    Plotly.newPlot(`plotly-heatmap-${trackGroup}`, data, layout, config)

    return document.getElementById(`plotly-heatmap-${trackGroup}`)
}


function addCategoryTrack({
  trackList,
  dataArr,
  trackData,
  sampleOrder,
  i
}) {
  trackList.forEach((track) => {
    const categoricalTrack = generateCategoricalTrack({
      sampleOrder,
      track: trackData[track],
    })
    dataArr.push(categoricalTrack)
  })
  
  // dataArr.push(fillerObj({
  //   i: i + 1,
  //   samples: sampleOrder,
  //   marker: '-',
  // }))
}