// app.js
async function loadApp() {
  const { app } = await import("./apiServer.mjs"); // this is your normal entry file - (index.js, main.js, app.mjs etc.)
}
loadApp()