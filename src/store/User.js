export const UserModule = {
    namespaced: true,

    state: {
        user: null
      },
    
      // functions that affect the state
      mutations: {
        SET_USER(state, user) {
          state.user = user;
        }
      
      },
    
      // functions that you use to call mutations
      actions: {
        setUser({commit}, user) {
          commit('SET_USER', user);
        }
      },
    
}