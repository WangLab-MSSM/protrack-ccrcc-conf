export default function annotations(samples, annotationTracks) {
  const middleSample = samples[Math.floor(samples.length/2)]
  const layoutOptions = {
      font: {
        family: 'Arial',
        size: 14,
        color: 'black',
      },
      showarrow: false,
      xref: 'x',
      yref: 'y',
      x: middleSample,
  }
  let res = []

  if (annotationTracks.top) {
    res.push(    {
      y: '-',
      text: "<b>Tumor-Up Kinase Activity Scores<sup>1</sup></b>",
      ...layoutOptions,
    },)
  }
  if (annotationTracks.bottom) {
    res.push({
      y: '--',
      text: "<b>Tumor-Down Kinase Activity Scores<sup>2</sup></b>",
      ...layoutOptions,
    },)
  }

  if (annotationTracks.foldchange) {
    res.push(    {
      y: '---',
      text: "<b>Global protein abundance foldchange (T/N)</b>",
      ...layoutOptions,
    },)
  }

  // if (!Object.values(annotationTracks).every(v => !v)) {
  //   res.push(
  //       {
  //       y: 0.5,
  //       x: 1.01,
  //       xref: 'paper',
  //       yref: 'paper',
  //       text: "<b><sup>1</sup>Tumor-Up Kinase Activity Scores:<br></b>A higher value suggests a <br>higher impact of the kinase on<br>the phosphosites up-regulated in the<br>tumor than the matched normal tissue. \
  //           <br><br><b><sup>2</sup>Tumor-Down Kinase Activity Scores</b>:<br>A higher value suggests<br>a higher impact of the kinase on<br>the phosphosites down-regulated in the<br>tumor than the matched normal tissue.\
  //           <br><br><b><sup>3</sup>Kinase Activity Score</b>:<br>Normalized KEA3 enrichment score<br>(mean rank) timing -1. Bigger values suggest higher kinase activity. \
  //           <br><br><b><sup>4</sup>FC</b>:<br>T/N fold change based on the <br>global protein abundances in<br>the matched tumor and normal adjacent<br>tumor samples of a given patient. \
  //           <br><br><b><sup>5</sup>Survival</b>:<br>Overall Survival time in days. \
  //           ",
  //       showarrow: false,
  //       xanchor: 'left',
  //       yanchor: 'top',
  //       width: 900,
  //       align: 'left',
  //       font: {
  //         family: 'Arial',
  //         size: 13,
  //       },
  //     },
  //   )
  // }

  return res
}