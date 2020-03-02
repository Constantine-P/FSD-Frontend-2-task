function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../source/', true, /(!.test).ts$|\.js$|\.styl$|\.css$/));
