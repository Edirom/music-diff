import Vue from 'vue'
import Vuex from 'vuex'

const verovioMaxZoom = 200
const verovioMinZoom = 10

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'en',
    zoom: 35,
    currentPage: 1,
    currentMaxPage: 10,
    measure: null,
    loading: [],
    networkErrorMsg: null,
    sunburstVisible: false,
    gotoMeasureVisible: false,
    mei: null
  },
  mutations: {
    SET_LANGUAGE (state, lang) {
      state.language = lang
    },
    SET_PAGE (state, n) {
      state.currentPage = n
    },
    SET_ZOOM (state, num) {
      state.zoom = num
    },
    SET_MAX_PAGE (state, n) {
      state.currentMaxPage = n
    },
    START_LOADING (state, request) {
      // see if request is on the list already, then remove from old position
      let index = state.loading.indexOf(request)
      if (index !== -1) {
        state.loading.splice(index, 1)
      }
      // add new request to end of list
      state.loading.push(request)
    },
    STOP_LOADING (state, request) {
      // identify current request and remove it from array
      let index = state.loading.indexOf(request)
      if (index !== -1) {
        state.loading.splice(index, 1)
      }
    },
    SHOW_NETWORK_ERROR (state, msg) {
      state.networkErrorMsg = msg
      // this is a dead end for now, with no way to get out of this state
    },
    TOGGLE_SUNBURST (state) {
      state.sunburstVisible = !state.sunburstVisible
    },
    TOGGLE_GOTOMEASURE (state) {
      state.gotoMeasureVisible = !state.gotoMeasureVisible
    },
    SET_MEI (state, mei) {
      state.mei = mei
    }
  },
  actions: {
    setLanguage ({ commit }, lang) {
      if (lang === 'de' || lang === 'en') {
        commit('SET_LANGUAGE', lang)
      }
    },
    setPage ({ commit, state }, n) {
      let num = parseInt(n, 10)
      if (!isNaN(num) && num >= 1 && num <= state.currentMaxPage) {
        commit('SET_PAGE', num)
      } else if (!isNaN(num) && num > state.currentMaxPage) {
        // if the requested page number is too high, load last page instead
        commit('SET_PAGE', state.currentMaxPage)
      }
    },
    increasePage ({ commit, state }) {
      let num = state.currentPage + 1
      if (num >= 1 && num <= state.currentMaxPage) {
        commit('SET_PAGE', num)
      }
    },
    decreasePage ({ commit, state }) {
      let num = state.currentPage - 1
      if (num >= 1 && num <= state.currentMaxPage) {
        commit('SET_PAGE', num)
      }
    },
    setMaxPage ({ commit }, n) {
      commit('SET_MAX_PAGE', n)
    },
    setZoom ({ commit, state }, n) {
      let num = parseInt(n, 10)
      if (!isNaN(num) && num >= verovioMinZoom && num <= verovioMaxZoom) {
        commit('SET_ZOOM', num)
      } else if (!isNaN(num) && num > verovioMaxZoom) {
        // if the requested zoom is too high, load max zoom instead
        commit('SET_ZOOM', verovioMaxZoom)
      } else if (!isNaN(num) && num < verovioMinZoom) {
        // if the requested zoom is too small, load min zoom instead
        commit('SET_ZOOM', verovioMinZoom)
      }
    },
    decreaseZoom ({ commit, state }) {
      let num = state.zoom - 10
      if (num >= verovioMinZoom && num <= verovioMaxZoom) {
        commit('SET_ZOOM', num)
      }
    },
    increaseZoom ({ commit, state }) {
      let num = state.zoom + 10
      if (num >= verovioMinZoom && num <= verovioMaxZoom) {
        commit('SET_ZOOM', num)
      }
    },
    toggleSunburst ({ commit }) {
      commit('TOGGLE_SUNBURST')
    },
    toggleGotoMeasure ({ commit }) {
      commit('TOGGLE_GOTOMEASURE')
    },
    compareFiles ({ commit }, combination) {
      return new Promise(resolve => {
        let url = 'https://meigarage.edirom.de/ege-webservice/Conversions/mei40Corpus%3Atext%3Axml/mei40Diff%3Atext%3Axml/'
        commit('START_LOADING', url)

        fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'text/plain'
          },
          body: combination // body data type must match "Content-Type" header
        })
          .then(response => {
            if (response.status !== 200) {
              console.log('something went wrong')
              console.log(response)
              throw Error(response.status)// Text)
            }
            return response.text()
          })
          .then(mei => {
            commit('SET_MEI', mei)
            commit('STOP_LOADING', url)
            resolve()
          })
          .catch((error) => {
            console.log('received error: ')
            console.log(error)
            commit('SHOW_NETWORK_ERROR', error)
            resolve()
          })
      })
    }
  },
  getters: {
    language: state => {
      return state.language
    },
    currentPage: state => {
      return state.currentPage
    },
    currentZoom: state => {
      return state.zoom
    },
    currentMEI: state => {
      if (state.mei === null) {
        return null
      }
      return state.mei
    },
    currentlyLoading: state => {
      if (state.loading.length === 0) {
        return null
      } else {
        // this case should not happen
        return 'loading data'
      }
      // todo: find mechanism to automatically notify admin (and tell that to the user)
    },
    loadingError: state => {
      return state.networkErrorMsg
    },
    sunburstVisible: state => {
      return state.sunburstVisible
    },
    gotoMeasureVisible: state => {
      return state.gotoMeasureVisible
    }
  }
})
