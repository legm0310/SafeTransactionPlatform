module.exports = {
  apps: [
    {
      // script: "app.js",
      // watch: ["services", "controllers"],
      // ignore_watch: ["node_modules"],
      // env: {},
      // output: "~/logs/pm2/console.log", // 로그 출력 경로 재설정
      // error: "~/logs/pm2/onsoleError.log", // 에러 로그 출력 경로 재설정
    },
  ],

  deploy: {
    production: {
      // user: "SSH_USERNAME",
      // host: "SSH_HOSTMACHINE",
      // ref: "origin/master",
      // repo: "GIT_REPOSITORY",
      // path: "DESTINATION_PATH",
      // "pre-deploy-local": "",
      // "post-deploy":
      //   "npm install && pm2 reload ecosystem.config.js --env production",
      // "pre-setup": "",
    },
  },
};
