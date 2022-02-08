import axios from 'axios'

export default {
  getGuild({ commit, state, rootState }, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.API_URL}/guild/${payload.guild_id}`, {
        headers: {
          Authorization: "Bearer " + rootState.user.token
        }
      })
        .then(response => {
          commit('saveGuild', response.data)
          resolve(state.user)
        })
        .catch(error => {
          commit('saveGuild', null)
          reject(error)
        })
    })
  }
}
