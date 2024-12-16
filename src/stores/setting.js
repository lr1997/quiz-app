// stores/settings.js
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: {
      modalType: 'typeA', // 默认使用单元结算
    },
  }),

  actions: {
    updateSettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings }
      localStorage.setItem('learningSettings', JSON.stringify(this.settings))
    },

    loadSettings() {
      const savedSettings = localStorage.getItem('learningSettings')
      if (savedSettings) {
        this.settings = JSON.parse(savedSettings)
      }
    },
  },
})
