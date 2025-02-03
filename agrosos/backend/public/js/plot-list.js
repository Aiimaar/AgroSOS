let plotToDelete = null; // Variable global para el terreno a eliminar
let plotToEdit = null; // Variable global para el terreno a editar

function selectPlot(plotId, plotName) {
  localStorage.setItem("selectedPlotId", plotId);
  localStorage.setItem("selectedPlotName", plotName);
  window.location.href = "/inside-a-plot";
}

function deletePlot() {
  if (!plotToDelete) return;

  fetch(`http://localhost:3000/api/plots/${plotToDelete}`, {
    method: "DELETE", // Asegúrate de que el backend soporte el método DELETE
  })
    .then((response) => {
      if (!response.ok) {
        console.error("Error en la respuesta del servidor:", response);
        throw new Error("No se pudo eliminar el terreno");
      }
      // Eliminar el elemento del DOM si la respuesta es correcta
      document
        .querySelector(`.plot-card[data-id="${plotToDelete}"]`)
        .remove();
      cancelDelete();
    })
    .catch((error) => {
      console.error(error);
      alert("No se pudo eliminar el terreno.");
    });
}

function confirmDelete(plotId) {
  plotToDelete = plotId;
  document.getElementById("delete-modal").classList.add("visible");
}

function cancelDelete() {
  plotToDelete = null;
  document.getElementById("delete-modal").classList.remove("visible");
}

function updatePlot(plotId) {
  plotToEdit = plotId;

  const plotCard = document.querySelector(
    `.plot-card[data-id="${plotId}"]`
  );
  if (!plotCard) {
    console.error("No se encontró el terreno con ID:", plotId);
    return;
  }

  const plotName = plotCard.querySelector(".terrain-name")?.textContent;
  const plotSize = plotCard.getAttribute("data-size");

  if (!plotName || !plotSize) {
    console.error("Faltan datos del terreno:", { plotName, plotSize });
    return;
  }

  document.getElementById("edit-name").value = plotName.trim();
  document.getElementById("edit-size").value = plotSize;

  document.getElementById("edit-modal").classList.add("visible");
}

function cancelEdit() {
  document.getElementById("edit-modal").classList.remove("visible");
}

document
  .getElementById("edit-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedName = document.getElementById("edit-name").value;
    const updatedSize = document.getElementById("edit-size").value;

    fetch(`/api/plots/${plotToEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedName, size: updatedSize }),
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Error en la respuesta del servidor:", response);
            throw new Error("Error al actualizar el terreno");
          }
          return response.json();
        })
        .then((data) => {
          const plotCard = document.querySelector(
            `.plot-card[data-id="${plotToEdit}"]`
          );
          plotCard.querySelector(".terrain-name").textContent = updatedName;
          plotCard.setAttribute("data-size", updatedSize);
      
          cancelEdit();
        })
        .catch((error) => {
          console.error(error);
          alert("No se pudo actualizar el terreno.");
        });
  });
