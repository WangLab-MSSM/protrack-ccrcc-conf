import arr from './arr-stats'
import sampleMeta from '../refs/sampleMeta'
import trackDetails from '../refs/trackDetails'
import categoryTracks from '../refs/categoryTracks'

let trackCategory = {}
Object.entries(categoryTracks).forEach(([category, trackList]) => {
    trackList.forEach((track) => trackCategory[track] = category)
})

export const transform_k_track_v_data = (k_track_v_data) => {
    let samples = Object.keys(sampleMeta)
    const sampleMetaTransformed = transformSampleMeta()
    let res = sampleMetaTransformed
    Object.entries(k_track_v_data).forEach(([track, data]) => {
        if (track.includes('mut')) { return }
        const gene = track.split(' ')[0]
        const dataType = track.split(' ')[1]

        const raw_z_tumor = samples
            .map(sample => k_track_v_data[track][`${sample}-T`])
        const raw_z_normal = samples
            .map(sample => k_track_v_data[track][`${sample}-N`])
        const raw_z = [...raw_z_tumor, ...raw_z_normal]
            .filter(el => el && !(typeof el === 'string'))
        const z_scores = arr.zScores(raw_z)
        const zScoreDict = Object.fromEntries(raw_z.map((v, i) => [v, z_scores[i]]))
        const tumorKey = `${track} T`
        const normalKey = `${track} N`
        let tumorData = createTissueObj({
            trackObj: k_track_v_data[track], 
            tissueStr: '-T',
            zScoreDict,
        })
        let normalData = createTissueObj({
            trackObj: k_track_v_data[track], 
            tissueStr: '-N',
            zScoreDict,
        })
        res[tumorKey] = {
            title: tumorKey,
            data: tumorData,
            clinical: false,
            clinicalData: null,
            gene,
            dataType,
            tissue: 'tumor',
            parent: track,
        }
        res[normalKey] = {
            title: normalKey,
            data: normalData,
            clinical: false,
            clinicalData: null,
            gene,
            dataType,
            tissue: 'normal',
            parent: track,
        }
    })
    
    return res
}


function createTissueObj({
    trackObj,
    tissueStr,
    zScoreDict,
  }) {
    return Object.fromEntries(Object.keys(trackObj)
      .filter(sample => sample.includes(tissueStr))
      .map(sample => [
          sample.split(tissueStr)[0], 
          zScoreDict[trackObj[sample]]
        ]
      )
    )
  }


  export const transformSampleMeta = () => {
      let res = {}
      
      Object.entries(sampleMeta).forEach(([sample, meta]) => {
        Object.entries(meta).forEach(([track, val]) => {
            if (!(track in res)) { res[track] = {
                title: track,
                data: {},
                clinical: true,
                clinicalData: {
                    trackDetails: trackDetails[track],
                    group: trackCategory[track],
                    numerical: trackCategory[track] === 'Numerical',
                    show: true,
                },
                gene: null,
                dataType: null,
                tissue: null,
            } }
            res[track].data[sample] = val
        })
      })
      return res
}


export const combine_k_track_v_data_NOT_normalized = (k_track_v_data) => {
    const sampleMetaTransformed = transformSampleMeta()
    let res = sampleMetaTransformed
    Object.entries(k_track_v_data).forEach(([track, data]) => {
        if (track.includes('mut')) { return }
        const gene = track.split(' ')[0]
        const dataType = track.split(' ')[1]

        const tumorKey = `${track} T`
        const normalKey = `${track} N`

        let tumorData = Object.fromEntries(Object.entries(k_track_v_data[track])
            .filter(([sample, v]) => sample.includes('-T'))
            .map(([sample, v]) => [sample.split('-T')[0], v]))

        let normalData = Object.fromEntries(Object.entries(k_track_v_data[track])
            .filter(([sample, v]) => sample.includes('-N'))
            .map(([sample, v]) => [sample.split('-N')[0], v]))

        res[tumorKey] = {
            title: tumorKey,
            data: tumorData,
            clinical: false,
            clinicalData: null,
            gene,
            dataType,
            tissue: 'tumor',
            parent: track,
        }
        res[normalKey] = {
            title: normalKey,
            data: normalData,
            clinical: false,
            clinicalData: null,
            gene,
            dataType,
            tissue: 'normal',
            parent: track,
        }
    })
    
    return res
}
