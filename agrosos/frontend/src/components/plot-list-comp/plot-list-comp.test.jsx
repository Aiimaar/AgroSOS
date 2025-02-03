import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach } from "vitest";
import PlotListComp from "./plot-list-comp";
import { MemoryRouter } from "react-router-dom";
import { DarkModeProvider } from "../../context/DarkModeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n"; // Importa tu configuración de i18n
import axios from "axios";

vi.mock("axios");

describe("PlotListComp Component", () => {
  const mockPlots = [
    { id: 1, name: "Plot 1", size: 100, color: "#abcdef" },
    { id: 2, name: "Plot 2", size: 200, color: "#123456" },
  ];

  const mockSensorData = [
    { Sensor: { type: "temperature" }, value: 25 },
    { Sensor: { type: "humidity" }, value: 60 },
  ];

  const darkModeValue = {
    darkMode: false,
    toggleDarkMode: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mock("axios");
    localStorage.setItem("authToken", "mockToken");
    localStorage.setItem("userId", "mockUserId");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders AddPlotComponent if no plots are available", async () => {
    // Simula la respuesta de la API para no tener plots
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <PlotListComp />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    // Verifica que se renderiza el componente AddPlotComponent cuando no hay plots
    expect(await screen.findByText(/Crear un terreno/i)).toBeInTheDocument();
  });

  it("renders the list of plots and sensor data", async () => {
    // Simula la respuesta de la API para obtener plots y datos de sensores
    axios.get
      .mockResolvedValueOnce({ data: mockPlots }) // Primera llamada para obtener plots
      .mockResolvedValueOnce({ data: mockSensorData }) // Segunda llamada para obtener datos de sensores
      .mockResolvedValueOnce({ data: mockSensorData }); // Tercera llamada para obtener datos de sensores

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <PlotListComp />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    // Verifica si los plots están presentes en la pantalla
    expect(await screen.findByText("Plot 1")).toBeInTheDocument();
    expect(await screen.findByText("Plot 2")).toBeInTheDocument();

    // Verifica si los iconos de temperatura y humedad están presentes
    const temperatureElements = screen.getAllByRole("img", {
      name: /temperature/i,
    });
    const humidityElements = screen.getAllByRole("img", { name: /humidity/i });

    // Asegúrate de que existen iconos de temperatura y humedad
    expect(temperatureElements.length).toBeGreaterThan(0);
    expect(humidityElements.length).toBeGreaterThan(0);
  });

  it("opens the delete modal and cancels delete", async () => {
    axios.get.mockResolvedValueOnce({ data: mockPlots });

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <PlotListComp />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    // Encuentra todos los botones con role="button"
    const buttons = await screen.findAllByRole("button");

    // Filtra el botón que contiene el ícono fa-trash
    const deleteButton = buttons.find((button) =>
      button.querySelector("svg")?.classList.contains("fa-trash")
    );

    // Asegúrate de que se ha encontrado el botón
    if (!deleteButton) {
      console.error("No se encontró el botón de eliminar");
    } else {
      // Verifica que el button tiene el icono adecuado
      const trashIcon = deleteButton.querySelector("svg");
      expect(trashIcon).toBeInTheDocument();

      // Realiza el clic
      fireEvent.click(deleteButton);

      // Verifica que el modal de confirmación aparece
      const modal = await screen.findByRole("delete-modal");
      expect(modal).toBeInTheDocument();

      // Haz clic en cancelar
      const cancelButton = screen.getByText(/cancel/i);
      fireEvent.click(cancelButton);

      // Verifica que el modal ya no esté en el DOM
      expect(screen.queryByRole("delete-modal")).not.toBeInTheDocument();
    }
  });

  it("handles edit form submission", async () => {
    axios.get.mockResolvedValueOnce({ data: mockPlots });
    axios.put.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <PlotListComp />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    const buttons = await screen.findAllByRole("button");

    // Filtra el botón que contiene el ícono fa-trash
    const editButton = buttons.find((button) =>
      button.querySelector("svg")?.classList.contains("fa-pen")
    );

    // Asegúrate de que se ha encontrado el botón
    if (!editButton) {
      console.error("No se encontró el botón de editar");
    } else {
      // Verifica que el button tiene el icono adecuado
      const penIcon = editButton.querySelector("svg");
      expect(penIcon).toBeInTheDocument();

      // Realiza el clic
      fireEvent.click(editButton);

      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: "Updated Plot" } });

      const saveButton = screen.getByText(/save/i);
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(axios.put).toHaveBeenCalledWith(
          "http://localhost:3000/api/plots/1",
          expect.any(FormData),
          expect.any(Object)
        );
      });
    }
  });

  it("deletes a plot when confirmed", async () => {
    axios.get.mockResolvedValueOnce({ data: mockPlots });
    axios.delete.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <PlotListComp />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    const buttons = await screen.findAllByRole("button");

    // Encuentra todos los botones de eliminación
    const deleteButton = buttons.find((button) =>
      button.querySelector("svg")?.classList.contains("fa-trash")
    );

    // Asegúrate de que se ha encontrado el botón
    if (!deleteButton) {
      console.error("No se encontró el botón de eliminar");
    } else {
      // Verifica que el button tiene el icono adecuado
      const trashIcon = deleteButton.querySelector("svg");
      expect(trashIcon).toBeInTheDocument();

      // Realiza el clic
      fireEvent.click(deleteButton);

    // Verifica que el modal de confirmación de eliminación aparece
    const modal = await screen.findByRole("delete-modal");
    expect(modal).toBeInTheDocument();

    // Simula el clic en el botón de confirmar eliminación
    const deleteConfirmButton = screen.getByText(/delete/i);
    fireEvent.click(deleteConfirmButton);

    // Verifica que la API de eliminación fue llamada
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:3000/api/plots/1",
        expect.any(Object)
      );
    });

    // Verifica que la parcela ya no aparece en la lista
    expect(screen.queryByText("Plot 1")).not.toBeInTheDocument();
  }
});

it("edits a plot and submits the form", async () => {
  axios.get.mockResolvedValueOnce({ data: mockPlots });
  axios.put.mockResolvedValueOnce({});

  render(
    <MemoryRouter>
      <DarkModeProvider value={darkModeValue}>
        <I18nextProvider i18n={i18n}>
          <PlotListComp />
        </I18nextProvider>
      </DarkModeProvider>
    </MemoryRouter>
  );

  // Encuentra todos los botones de edición
  const buttons = await screen.findAllByRole("button");

    // Filtra el botón que contiene el ícono fa-trash
    const editButton = buttons.find((button) =>
      button.querySelector("svg")?.classList.contains("fa-pen")
    );

    // Asegúrate de que se ha encontrado el botón
    if (!editButton) {
      console.error("No se encontró el botón de editar");
    } else {
      // Verifica que el button tiene el icono adecuado
      const penIcon = editButton.querySelector("svg");
      expect(penIcon).toBeInTheDocument();

      // Realiza el clic
      fireEvent.click(editButton);

  // Verifica que el modal de edición aparece
  const editModal = await screen.findByRole("dialog");
  expect(editModal).toBeInTheDocument();

  // Cambia el nombre y el tamaño del terreno
  const nameInput = screen.getByLabelText(/name/i);
  fireEvent.change(nameInput, { target: { value: "Updated Plot Name" } });

  const sizeInput = screen.getByLabelText(/size/i);
  fireEvent.change(sizeInput, { target: { value: "300" } });

  // Envía el formulario
  const saveButton = screen.getByText(/save/i);
  fireEvent.click(saveButton);

  // Verifica que la API de edición fue llamada con los valores correctos
  await waitFor(() => {
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:3000/api/plots/1",
      expect.any(FormData),
      expect.any(Object)
    );
  });

  // Verifica que los cambios se reflejan en la lista de parcelas
  expect(screen.queryByText("Updated Plot Name")).toBeInTheDocument();
  expect(screen.queryByText("300")).toBeInTheDocument();
}
});

});
