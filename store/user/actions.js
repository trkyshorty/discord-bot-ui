import axios from 'axios'

export default {
  setToken ({ commit }, payload) {
    commit('saveToken', payload.token)
  },
  getUser ({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.API_URL}/users/me`, {
        headers: {
          Authorization: "Bearer " + state.token
        }
      })
        .then(response => {
          commit('saveUser', response.data)
          resolve(state.user)
        })
        .catch(error => {
          commit('saveUser', null)
          commit('saveToken', null)
          reject(error)
        })
    })
  },
  getGuilds ({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.API_URL}/users/me/guilds`, {
        headers: {
          Authorization: "Bearer " + state.token
        }
      })
        .then(response => {
          commit('saveGuilds', response.data)
          resolve(state.guilds)
        })
        .catch(error => {
          commit('saveGuilds', [])
          reject(error)
        })
    })
  },
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('saveUser', null)
      commit('saveToken', null)
      resolve(null)
    })
  },
}
