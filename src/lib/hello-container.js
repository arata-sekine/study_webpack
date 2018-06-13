const helloContainer = () => {
  const container = document.createElement("div");
  container.innerHTML = "<p>Hello webpack!</p>";
  return container;
};

export default helloContainer;
