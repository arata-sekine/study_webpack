const aboutContainer = () => {
  const container = document.createElement("div");
  const message = 'About webpack.';
  container.innerHTML = `<p>${message}</p>`; // テンプレート文字列を使用
  return container;
};

export default aboutContainer;
