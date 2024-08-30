const createBtn = document.getElementById("create-btn");
const createInput = document.getElementById("create-input");
const imageBtn = document.getElementById("selectFile");
const fileinput = document.getElementById("myfile");

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createTierList(createInput.value);
  createInput.value = "";
});

imageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedFile = fileinput.files[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");

      const image = document.createElement("img");
      image.src = event.target.result;
      image.draggable = true;
      image.classList.add("draggable-image");

      // Set drag event listeners
      image.addEventListener("dragstart", handleDragStart);
      image.addEventListener("dragend", handleDragEnd);

      imageContainer.appendChild(image);
      document.body.appendChild(imageContainer);
    };
    reader.readAsDataURL(selectedFile);
  }
});

const createTierList = (name) => {
  const createdListSection = document.createElement("div");
  createdListSection.classList.add("createdListSection");

  const headingBox = document.createElement("div");
  headingBox.classList.add("Tier-name");
  const heading = document.createElement("h4");
  heading.textContent = name;
  headingBox.appendChild(heading);

  const listContainer = document.createElement("div");
  listContainer.classList.add("list-container");

  // Set up the list container as a drop target
  listContainer.addEventListener("dragover", handleDragOver);
  listContainer.addEventListener("drop", handleDrop);

  createdListSection.appendChild(headingBox);
  createdListSection.appendChild(listContainer);
  document.body.appendChild(createdListSection);
};

// Handle the drag start event
const handleDragStart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.src);
  e.target.classList.add("dragging");
  // Store the reference to the image container
  e.dataTransfer.setData("parent-container", e.target.parentElement.className);
};

// Handle the drag end event
const handleDragEnd = (e) => {
  e.target.classList.remove("dragging");
};

// Handle the drag over event (allows the drop)
const handleDragOver = (e) => {
  e.preventDefault();
};

// Handle the drop event
// Handle the drop event
const handleDrop = (e) => {
  e.preventDefault();
  const imageSrc = e.dataTransfer.getData("text/plain");
  const parentContainerClass = e.dataTransfer.getData("parent-container");

  if (imageSrc) {
    // Create a new image element in the list container
    const droppedImage = document.createElement("img");
    droppedImage.src = imageSrc;
    droppedImage.classList.add("dropped-image");
    e.target.appendChild(droppedImage);

    // Remove the original image container from the document
    const parentContainer = document.querySelector(`.${parentContainerClass}`);
    const originalImageContainer = parentContainer.querySelector(
      `img[src="${imageSrc}"]`
    ).parentElement;

    if (originalImageContainer) {
      originalImageContainer.remove(); // Remove the entire image container
    }
  }
};
