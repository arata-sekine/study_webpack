import helloMessage from './hello.txt'; // テキストファイルの内容をhelloMessageに読み取る

const helloContainer = () => {
  const container = document.createElement("div");
  container.innerHTML = "<p>" + helloMessage + "</p>";  // 内容を出力
  return container;
};

export default helloContainer;
