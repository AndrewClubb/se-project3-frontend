module.exports = {
  devServer: {
    host: "localhost",
    port: "8081",
  },
  publicPath:
    process.env.NODE_ENV === "development" ? "/" : "/project3/2022/t2/",
  transpileDependencies: ["vuetify"],
};
