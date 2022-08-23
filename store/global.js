export const state = () => ({
  isDarkMode: false,
});

export const mutations = {
  toggleMode(state) {
    state.isDarkMode = !state.isDarkMode;
  },
};
