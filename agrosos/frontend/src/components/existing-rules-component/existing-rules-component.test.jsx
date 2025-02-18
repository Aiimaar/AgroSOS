import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach } from "vitest";
import ExistingRulesComponent from "./existing-rules-component";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { DarkModeProvider } from "../../context/DarkModeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n"; // Importa tu configuración de i18n
import axios from "axios";

vi.mock("axios");
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("ExistingRulesComponent", () => {
  const mockRules = [
    {
      id: 1,
      name: "Rule 1",
      crop_id: "1",
      rule_info: JSON.stringify({
        AND: [
          {
            conditions: [{ type: "temperature", operator: ">", value: 25 }],
            actions: ["action1"],
            sensors: [{ type: "temperature_sensor" }],
          },
        ],
      }),
    },
    {
      id: 2,
      name: "Rule 2",
      crop_id: "2",
      rule_info: JSON.stringify({
        AND: [
          {
            conditions: [{ type: "humidity", operator: "<", value: 60 }],
            actions: ["action2"],
            sensors: [{ type: "humidity_sensor" }],
          },
        ],
      }),
    },
  ];

  const mockCrops = [
    { id: 1, name: "Crop 1" },
    { id: 2, name: "Crop 2" },
  ];

  const darkModeValue = {
    darkMode: false,
    toggleDarkMode: vi.fn(),
  };

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <ExistingRulesComponent />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("authToken", "mockToken");

    axios.create.mockReturnValue({
      get: vi.fn().mockImplementation((url) => {
        if (url === "/rules") {
          return Promise.resolve({ data: mockRules });
        } else if (url === "/crops") {
          return Promise.resolve({ data: mockCrops });
        }
        return Promise.reject(new Error("Not found"));
      }),
      delete: vi.fn().mockResolvedValue({}),
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  // Test para verificar que se renderiza la lista de reglas correctamente
  it("renders the list of rules", async () => {
    renderComponent();
    expect(await screen.findByText("Rule 1")).toBeInTheDocument();
    expect(await screen.findByText("Rule 2")).toBeInTheDocument();
    expect(await screen.findByText("Crop 1")).toBeInTheDocument();
    expect(await screen.findByText("Crop 2")).toBeInTheDocument();
  });

  // Test para verificar que se muestra el mensaje "No rules" y la navegación funciona
  it("renders 'No rules' message and navigates to add rule page on add button click", async () => {
    const mockedNavigate = vi.fn();
    useNavigate.mockReturnValue(mockedNavigate);

    axios.create.mockReturnValueOnce({
      get: vi.fn().mockImplementation((url) => {
        if (url === "/rules") {
          return Promise.resolve({ data: [] });
        } else if (url === "/crops") {
          return Promise.resolve({ data: mockCrops });
        }
        return Promise.reject(new Error("Not found"));
      }),
      delete: vi.fn().mockResolvedValue({}),
    });

    renderComponent();
    expect(await screen.findByText("Añadir regla")).toBeInTheDocument();
    const addButton = await screen.findByRole("button", { name: /Añadir una nueva regla/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/add-rule");
    });
  });

  // Test para abrir y cerrar el modal de confirmación de eliminación
  it("opens and closes the delete confirmation modal", async () => {
    renderComponent();

    const deleteButtons = await screen.findAllByRole("button", { name: /Eliminar regla/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/¿Estás seguro de que deseas eliminar esta regla\?/i)).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText(/¿Estás seguro de que deseas eliminar esta regla\?/i)).not.toBeInTheDocument();
    });
  });

  // Test para verificar que se puede eliminar una regla
  it("deletes a rule when confirmed", async () => {
    const mockDelete = vi.fn().mockResolvedValue({});
    axios.create.mockReturnValue({
      get: vi.fn().mockImplementation((url) => {
        if (url === "/rules") {
          return Promise.resolve({ data: mockRules });
        } else if (url === "/crops") {
          return Promise.resolve({ data: mockCrops });
        }
        return Promise.reject(new Error("Not found"));
      }),
      delete: mockDelete,
    });

    renderComponent();

    const deleteButtons = await screen.findAllByRole("button", { name: /Eliminar regla/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/¿Estás seguro de que deseas eliminar esta regla\?/i)).toBeInTheDocument();
    });

    const confirmButton = screen.getByRole("button", { name: /Aceptar/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith(`/rules/1`);
    });

    await waitFor(() => {
      expect(screen.queryByText("Rule 1")).not.toBeInTheDocument();
    });
  });

  // Prueba que al hacer clic en el botón de editar, la navegación se realice correctamente
  it("navigates to edit rule page on edit button click", async () => {
    const mockedNavigate = vi.fn();
    useNavigate.mockReturnValue(mockedNavigate);

    renderComponent();

    const editButtons = await screen.findAllByRole("button", { name: /Editar Regla/i });
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith(`/edit-rule/${mockRules[0].id}`);
    });
  });

  // Prueba que al hacer clic en el botón de volver atrás, la navegación lleve a la página de configuración
  it("navigates to settings page on back button click", async () => {
    const mockedNavigate = vi.fn();
    useNavigate.mockReturnValue(mockedNavigate);

    renderComponent();

    const backButton = await screen.findByRole("button", { name: /Flecha para volver atrás/i });
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/settings");
    });
  });
});