import Vue from 'vue'
import Vuex from 'vuex'

import { apolloClient } from '../main'
import { GET_OPTIONS, ADD_CONFIG, GET_CONFIGS, UPDATE_CONFIG, DELETE_CONFIG } from '../queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    options: {},
    columns: [],
    visibleColumns: [],
    items: [],
    validConfigs: [],
    validDates: [],
    dataRows: [],
    jsonConfig: null
  },
  mutations: {
    setOptions: (state, payload) => {
      var column = null
      state.options = {}
      payload.forEach(item => {
        column = { name: item.label, label: item.label, field: item.label, align: 'center', sortable: true }
        state.columns.push(column)
        state.visibleColumns.push(item.label)
        state.options[item.label] = item
        state.items.push(item)
      })
      column = { name: 'date', label: 'Date', field: 'date', align: 'center', sortable: true }
      state.columns.push(column)
      state.visibleColumns.push('date')
      column = { label: 'Id', field: 'id', align: 'center', sortable: true }
      state.columns.push(column)
    },
    setValidConfigs: (state, payload) => {
      state.validConfigs = []
      state.validDates = []
      state.dataRows = []
      payload.forEach(item => {
        state.validConfigs.push(JSON.parse(item.jsonConfig))
        state.validDates.push(item.validDate)
        let dataRow = JSON.parse(item.jsonConfig)
        dataRow['date'] = item.validDate
        dataRow['id'] = item._id
        state.dataRows.push(dataRow)
      })
    }
  },
  actions: {
    getOptions: ({ commit }) => {
      apolloClient
        .query({
          query: GET_OPTIONS
        })
        .then(({ data }) => {
          commit('setOptions', data.getOptions)
        })
        .catch(err => {
          console.error(err)
        })
    },

    getConfigs: ({ commit }) => {
      apolloClient
        .query({
          query: GET_CONFIGS
        })
        .then(({ data }) => {
          commit('setValidConfigs', data.getConfigs)
        })
        .catch(err => {
          console.error(err)
        })
    },
    addConfig: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_CONFIG,
          variables: payload
        })
        .catch(err => {
          console.error(err)
        })
    },
    updateConfig: ({ state }, payload) => {
      apolloClient
        .mutate({
          mutation: UPDATE_CONFIG,
          variables: payload
        })
        .then(({ data }) => {
          const index = state.dataRows.findIndex(config => config.id === data.updateConfig._id)
          state.dataRows[index].date = data.updateConfig.validDate
        })
        .catch(err => {
          console.error(err)
        })
    },

    deleteConfig: ({ state }, payload) => {
      apolloClient
        .mutate({
          mutation: DELETE_CONFIG,
          variables: payload
        })
        .then(({ data }) => {
          const index = state.dataRows.findIndex(config => config.id === data.deleteConfig._id)
          state.dataRows.splice(index)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  getters: {
    columns: state => state.columns,
    visibleColumns: state => state.visibleColumns,
    options: state => state.options,
    dataRows: state => state.dataRows,
    validConfigs: state => state.validConfigs,
    validDates: state => state.validDates
  },
  modules: {}
})
