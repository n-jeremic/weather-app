export const store = {
  state: {
    currentCity: null,
    currentNumOfDays: 1,
    apiKey: '22499a2db07fe90d36fd48a0729fc39a',
    intervalId: null
  },
  mutations: {
    updateCurrentCity(city) {
      if (city) {
        store.state.currentCity = city.toLowerCase()
      } else {
        store.state.currentCity = city
      }

    },
    updateCurrentNumOfDays(numOfDays) {
      store.state.currentNumOfDays = numOfDays
    },
    updateIntervalId(intervalId) {
      store.state.intervalId = intervalId
    }
  },
  getters: {
    currentCity() {
      return store.state.currentCity
    },
    currentNumOfDays() {
      return store.state.currentNumOfDays
    },
    apiKey() {
      return store.state.apiKey
    },
    intervalId() {
      return store.state.intervalId
    }
  }
}