module.exports = {
  apps: [{
    name: "ilovejson",
    script: "yarn",
    args: "start",
    watch: false,
    interpreter: '/usr/bin/bash',
    env: {
      "NODE_ENV": "production",
    },
  }]
}
