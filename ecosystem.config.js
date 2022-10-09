module.exports = {
  apps: [{
    name: "ilovejson",
    script: "yarn",
    args: "start",
    watch: false,
    interpreter: '/root/.fnm/fnm',
    interpreter_args: 'exec --using=16.15.0 node',
    env: {
      "NODE_ENV": "production",
    },
    instances: "max",
    exec_mode: "cluster"
  }]
}
