const calculateCorrelation = require("calculate-correlation")

export default function scatterplot({
    divId,
    trackA,
    trackB,
    useZscore,
}
) {
    const Plotly = window.Plotly

    if (!trackA || !trackB) { return }

    const samples = Object.keys(trackA.data).filter(s => s in trackB.data)

    const x = samples.map(sample => trackA.data[sample])
    const y = samples.map(sample => trackB.data[sample])

    const correlation = calculateCorrelation(x, y)

    var trace1 = {
        x,
        y,
        mode: 'markers',
        type: 'scatter',
        name: 'Team A',
        marker: { size: 12 }
    }

    const suffixes = {
        'rna': 'TPM',
        'phospho': 'Log2 intensity',
        'proteo': 'Log2 intensity',
        'glyco_glyco': 'Log2 intensity',
        'phospho_glyco': 'Log2 intensity',
    }

    // add # of samples
    var data = [ trace1 ];
    
    const xTitle = useZscore ? `${trackA.title} (zscore)` : `${trackA.title} (${suffixes[trackA.dataType]})`
    const yTitle = useZscore ? `${trackB.title} (zscore)` : `${trackB.title} (${suffixes[trackB.dataType]})`
    
    var layout = {
        title: `${trackA.title} - ${trackB.title}<br>pearson correlation: ${correlation}`,
        xaxis: {
            title: xTitle,
        },
        yaxis: {
            title: yTitle,
        },
    };
      
    Plotly.newPlot(divId, data, layout);
}