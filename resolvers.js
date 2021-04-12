module.exports = {
  Query: {
    getOptions: async (_, args, { Option }) => {
      const options = await Option.find({}).sort({ position: 'asc' })
      return options
    },

    getConfigs: async (_, args, { Config }) => {
      const configs = await Config.find({})
      return configs
    }
  },
  Mutation: {
    addConfig: async (_, { jsonConfig, validDate }, { Config }) => {
      const newConfig = await new Config({
        jsonConfig,
        validDate
      }).save()
      return newConfig
    },
    updateConfig: async (_, { configId, validDate }, { Config }) => {
      const config = await Config.findOneAndUpdate({ _id: configId }, { $set: { validDate } }, { new: true })
      return config
    },
    deleteConfig: async (_, { configId }, { Config }) => {
      const config = await Config.findOneAndRemove({ _id: configId })
      return config
    }
  }
}
