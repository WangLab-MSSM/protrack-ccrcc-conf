import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import cloneDeep from 'lodash/cloneDeep'

import { getTrackData, getTracks } from '../firebase'
import { transform_k_track_v_data, combine_k_track_v_data_NOT_normalized } from '../helpers'

import categoryTracks from '../refs/categoryTracks'
import trackDetails from '../refs/trackDetails'
import sampleHisto from '../refs/sampleHisto'
import sampleMeta from '../refs/sampleMeta'
import available from '../refs/available'

import sortFn from '../sortFn'


export default new Vuex.Store({
  state: {
    available,
    Boxplot_data: {},
    Boxplot_data_raw: {},
    Boxplot_dataType: 'proteo',
    Boxplot_genes: [],
    Boxplot_stratifyBy: null,
    Boxplot_useZScore: false,
    HistologyViewer_mutationGene: '',
    HistologyViewer_Sample: 'C3N-00831',
    Heatmap_categoryTracks: cloneDeep(categoryTracks),
    Heatmap_categoryTracksFiltered: cloneDeep(categoryTracks),
    Heatmap_data: {},
    Heatmap_dataTypes: ['rna', 'proteo', 'phospho', 'glyco_glyco', 'phospho_glyco'],
    Heatmap_shownDataTypes: ['rna', 'proteo', 'phospho'],
    Heatmap_trackGroups: [],
    Heatmap_genes: [],
    Heatmap_sampleOrder: Object.keys(sampleMeta),
    Heatmap_sampleShow: {},
    Heatmap_tab: 'tab-1',
    Heatmap_landingGenes: ['CA9', 'ANGPTL4', 'VEGFA', 'EGLN3', 'PLVAP', 'ENPP3', 'SLC6A3'],
    Heatmap_sortTracks: ['tumorClass'],
    SampleDashboard_data: cloneDeep(sampleMeta),
    sampleDashboard_graphs: [
      'Gender',
      'Country',
      'Tumor stage',
      'Tumor grade',
      'Vital status',
      'Hypertension',
      'Alcohol consumption',
      'Smoking status',
      'BMI'
    ],
    SampleDashboard_percentView: true,
    sampleHisto,
    sampleMeta,
    Scatterplot_data: {},
    Scatterplot_data_raw: {},
    Scatterplot_genes: [],
    Scatterplot_tracks: [],
    Scatterplot_useZScore: false,
    view: 'Sample dashboard',
    views: [ 
      'Boxplot', 
      'Heatmap', 
      'Histology viewer',
      'Quality control',
      'Sample dashboard', 
      'Scatterplot',
    ]
  },
  mutations: {
    SET_BOXPLOT_DATA_TYPE(state, { Boxplot_dataType }) {
      state.Boxplot_dataType = Boxplot_dataType
    },
    SET_BOXPLOT_STRATIFY_BY(state, { Boxplot_stratifyBy }) {
      state.Boxplot_stratifyBy = Boxplot_stratifyBy
    },
    SET_GENES(state, { view, genes }) {
      state[`${view}_genes`] = genes
    },
    SET_HEATMAP_CATEGORY_TRACKS_FILTERED(state, { Heatmap_categoryTracksFiltered }) {
      state.Heatmap_categoryTracksFiltered = cloneDeep(Heatmap_categoryTracksFiltered)
    },
    SET_HEATMAP_SHOWN_DATA_TYPES(state, { Heatmap_shownDataTypes }) {
      state.Heatmap_shownDataTypes = Heatmap_shownDataTypes
    },
    SET_HEATMAP_SORT_TRACKS(state, { Heatmap_sortTracks }) {
      state.Heatmap_sortTracks = Heatmap_sortTracks
    },
    SET_HEATMAP_TAB(state, { Heatmap_tab }) {
      state.Heatmap_tab = Heatmap_tab
    },
    SET_HEATMAP_TRACK_GROUPS(state, { Heatmap_trackGroups }) {
      state.Heatmap_trackGroups = Heatmap_trackGroups
    },
    SET_HISTOLOGY_VIEWER_SAMPLE(state, { sample }) {
      state.HistologyViewer_Sample = sample
    },
    SET_SAMPLE_DASHBOARD_GRAPHS(state, { sampleDashboard_graphs }) {
      state.sampleDashboard_graphs = sampleDashboard_graphs
    },
    SET_SAMPLE_DASHBOARD_PERCENT_VIEW(state, { SampleDashboard_percentView }) {
      state.SampleDashboard_percentView = SampleDashboard_percentView
    },
    SET_SAMPLE_ORDER(state, { view, sampleOrder }) {
      state[`${view}_sampleOrder`] = sampleOrder
    },
    SET_SCATTERPLOT_TRACKS(state, { Scatterplot_tracks }) {
      state.Scatterplot_tracks = Scatterplot_tracks
    },
    SET_USE_Z_SCORE(state, { view, useZScore }) {
      state[`${view}_useZScore`] = useZScore
    },
    SET_VIEW(state, { view }) {
      state.view = view
    },
    SET_VIEW_DATA(state, { view, data }) {
      state[`${view}_data`] = data
    },
    SET_VIEW_DATA_RAW(state, { view, data }) {
      state[`${view}_data_raw`] = data
    },
  },
  actions: {
    async getTrackData(store, { view, tracks }) {
      const trackPromises = [...tracks].map((track) => {
        return getTrackData(track)
      })

      const trackRes = await Promise.all(trackPromises)

      const k_track_v_data = Object.fromEntries(trackRes)

      const combinedDataNotNormalized = combine_k_track_v_data_NOT_normalized(k_track_v_data)
      const normalizedCombinedData = transform_k_track_v_data(k_track_v_data)

      store.commit('SET_VIEW_DATA', { view, data: normalizedCombinedData })
      store.commit('SET_VIEW_DATA_RAW', { view, data: combinedDataNotNormalized })

      if ( view === 'Heatmap ') { 
        store.dispatch('sortSamples', { view })
      }
    },
    async getTracks(store, { view, genes }) {
      const trackPromises = [...genes].map((gene) => {
        return getTracks(gene)
      })
      
      const trackRes = await Promise.all(trackPromises)
      
      let k_gene_v_tracks = Object.fromEntries(trackRes)

      const tracks = Object.values(k_gene_v_tracks).flat()

      store.dispatch('getTrackData', { view, tracks })
      store.commit('SET_GENES', { view, genes })
    },
    setBoxplotDataType(store, { Boxplot_dataType }) {
      store.commit('SET_BOXPLOT_DATA_TYPE', { Boxplot_dataType })
    },
    setBoxplotStratifyBy(store, { Boxplot_stratifyBy }) {
      store.commit('SET_BOXPLOT_STRATIFY_BY', { Boxplot_stratifyBy })
    },
    setHeatmapCategoryTracksFiltered(store, { Heatmap_categoryTracksFiltered }) {
      store.commit('SET_HEATMAP_CATEGORY_TRACKS_FILTERED', { Heatmap_categoryTracksFiltered })
    },
    setHeatmapShownDataTypes(store, { Heatmap_shownDataTypes }) {
      store.commit('SET_HEATMAP_SHOWN_DATA_TYPES', { Heatmap_shownDataTypes })
    },
    setHeatmapSortTracks(store, { Heatmap_sortTracks }) {
      store.commit('SET_HEATMAP_SORT_TRACKS', { Heatmap_sortTracks })
      store.dispatch('sortSamples', { view: 'Heatmap' })
    },
    setHeatmapTab(store, { Heatmap_tab }) {
      store.commit('SET_HEATMAP_TAB', { Heatmap_tab })
    },
    setHeatmapTrackGroups(store, { Heatmap_trackGroups }) {
      store.commit('SET_HEATMAP_TRACK_GROUPS', { Heatmap_trackGroups })
    },
    setHistologyViewerSample(store, { sample }) {
      store.commit('SET_HISTOLOGY_VIEWER_SAMPLE', { sample })
    },
    setSampleDashboardGraphs(store, { sampleDashboard_graphs }) {
      store.commit('SET_SAMPLE_DASHBOARD_GRAPHS', { sampleDashboard_graphs })
    },
    setSampleDashboardPercentView(store, { SampleDashboard_percentView }) {
      store.commit('SET_SAMPLE_DASHBOARD_PERCENT_VIEW', { SampleDashboard_percentView })
    },
    setScatterplotTracks(store, { Scatterplot_tracks }) {
      store.commit('SET_SCATTERPLOT_TRACKS', { Scatterplot_tracks })
    },
    setView(store, { view }) {
      store.commit('SET_VIEW', { view })
    },
    sortSamples(store, { view }) {
      const sortTracks = store.state[`${view}_sortTracks`].map(el => [el])
      // https://jsfiddle.net/L9x8ao0r/20

      const Heatmap_data =  store.state.Heatmap_data
      let combinedData = {}
      let sampleMetaVals = {}
      Object.entries(trackDetails).forEach(([category, trackDetail]) => {
        sampleMetaVals[category] = {}
        trackDetail.forEach((track) => {
          sampleMetaVals[category][track.label] = track.value
        })
      })

      Object.keys(sampleMeta).forEach((sample) => {
        let sampleMetaSample = {}
        Object.entries(sampleMeta[sample]).forEach(([track, val]) => {
          sampleMetaSample[track] = track in sampleMetaVals ? sampleMetaVals[track][val] : val
        })
        let res = {
          id: sample,
        }
        Object.keys(Heatmap_data).forEach(track => {
          res[track] = Heatmap_data[track].data[sample]
        })
        combinedData[sample] = {
          ...res,
          ...sampleMetaSample
        }
      })

      const sorted = Object.values(combinedData).sort(sortFn(sortTracks))
      const sampleOrder = sorted.map(el => el.id)
      
      store.commit('SET_SAMPLE_ORDER', { view, sampleOrder })
    },
    setUseZScore(store, { view, useZScore }) {
      store.commit('SET_USE_Z_SCORE', { view, useZScore })
    },
  },
})
