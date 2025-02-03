import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach } from "vitest";
import UserList from "./user-list";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { DarkModeProvider } from "../../context/DarkModeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n"; // Importa tu configuración de i18n
import axios from "axios";

vi.mock("axios");

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("UserList Component", () => {
  const mockUsers = [
    { id: 1, name: "John Doe", role: "Admin", profile_image: "" },
    { id: 2, name: "Jane Doe", role: "Farmer", profile_image: "" },
  ];

  const darkModeValue = {
    darkMode: false,
    toggleDarkMode: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("authToken", "mockToken");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("1. Renderiza correctamente la lista de usuarios", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <UserList />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Lista de usuarios")).toBeInTheDocument();
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("2. Muestra un mensaje de error si la API falla", async () => {
    axios.get.mockRejectedValueOnce(new Error("Error de carga"));

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <UserList />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  it("3. Redirige al login si no hay token", () => {
    localStorage.removeItem("authToken");

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <UserList />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("4. Permite la paginación de usuarios", async () => {
    axios.get.mockResolvedValueOnce({
      data: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        role: "User",
        profile_image: "",
      })),
    });

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <UserList />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("User 1")).toBeInTheDocument();
      expect(screen.queryByText("User 11")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("Página siguiente"));

    await waitFor(() => {
      expect(screen.getByText("User 11")).toBeInTheDocument();
    });
  });

  it("5. Permite abrir el modal de edición", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <UserList />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("John Doe"));

    fireEvent.click(screen.getByLabelText("Editar usuario John Doe"));

    await waitFor(() => {
      expect(screen.getByText("Editar Usuario")).toBeInTheDocument();
    });
  });

  it("6. Permite eliminar un usuario", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });
    axios.delete.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <DarkModeProvider value={darkModeValue}>
          <I18nextProvider i18n={i18n}>
            <UserList />
          </I18nextProvider>
        </DarkModeProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("John Doe"));

    fireEvent.click(screen.getByLabelText("Eliminar usuario John Doe"));

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });
});
