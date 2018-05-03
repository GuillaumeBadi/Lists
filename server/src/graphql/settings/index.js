const typeDefs = `
  type Settings {
    settingA: String
  }
`

const resolvers = {
  Settings: {
    settingA: ({ setting }) => setting.settingA
  }
}

module.exports = {
  typeDefs: () => [typeDefs],
  resolvers
}
