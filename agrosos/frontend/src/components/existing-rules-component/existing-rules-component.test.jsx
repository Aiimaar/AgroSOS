/* global jest */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../context/DarkModeContext";
import ExistingRulesComponent from "./existing-rules-component";

// Mockear useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mockear axios
jest.mock("axios");

// Mockear useTranslation
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

// Mockear useDarkMode
jest.mock("../../context/DarkModeContext", () => ({
  useDarkMode: jest.fn(),
}));

describe("ExistingRulesComponent", () => {
  const mockNavigate = jest.fn();
  const mockT = jest.fn((key) => key); // Función mock simple para useTranslation

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useTranslation.mockReturnValue({ t: mockT });
    useDarkMode.mockReturnValue({ darkMode: false });
    axios.create.mockReturnThis(); // Asegura que axios.create() devuelve la instancia mockeada

    // Mockear localStorage
    global.localStorage = {
      getItem: jest.fn().mockReturnValue("dummy-token"),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renderizar el componente y verificar el título
  test("renders without crashing and displays title", async () => {
    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [] }); // Mock para rules y crops
    render(<ExistingRulesComponent />);
    await waitFor(() => expect(screen.getByText("rules")).toBeInTheDocument());
  });

  // Test 2: Comportamiento cuando no hay reglas existentes
  test("displays no rules message when there are no rules", async () => {
    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [] }); // Mock para rules y crops
    render(<ExistingRulesComponent />);
    await waitFor(() =>
      expect(screen.getByText("no_rules_message_add")).toBeInTheDocument()
    );
  });

  // Test 3: Comportamiento al hacer clic en el botón de agregar regla
  test("navigates to add rule page when add rule button is clicked", async () => {
    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [] }); // Mock para rules y crops
    render(<ExistingRulesComponent />);
    await waitFor(() =>
      fireEvent.click(screen.getByLabelText("add_rule_button_label"))
    );
    expect(mockNavigate).toHaveBeenCalledWith("/add-rule");
  });

  // Test 4: Comportamiento al hacer clic en el botón de editar regla
  test("navigates to edit rule page when edit button is clicked", async () => {
    const mockRules = [
      { id: 1, name: "Rule 1", rule_info: "{}", crop_id: "1" },
    ];
    const mockCrops = [{ id: 1, name: "Crop 1" }];
    axios.get
      .mockResolvedValueOnce({ data: mockRules })
      .mockResolvedValueOnce({ data: mockCrops });
    render(<ExistingRulesComponent />);
    await waitFor(() => fireEvent.click(screen.getByLabelText("edit_rule")));
    expect(mockNavigate).toHaveBeenCalledWith("/edit-rule/1");
  });

  // Test 5: Abrir modal de confirmación al eliminar una regla
  test("opens confirmation modal when delete button is clicked", async () => {
    const mockRules = [
      { id: 1, name: "Rule 1", rule_info: "{}", crop_id: "1" },
    ];
    const mockCrops = [{ id: 1, name: "Crop 1" }];
    axios.get
      .mockResolvedValueOnce({ data: mockRules })
      .mockResolvedValueOnce({ data: mockCrops });
    render(<ExistingRulesComponent />);
    await waitFor(() => fireEvent.click(screen.getByLabelText("delete_rule")));
    expect(screen.getByText("confirm_delete_rule")).toBeInTheDocument();
  });

  // Test 6: Comportamiento al confirmar la eliminación de una regla
  test("deletes a rule when delete is confirmed", async () => {
    const mockRules = [
      { id: 1, name: "Rule 1", rule_info: "{}", crop_id: "1" },
    ];
    const mockCrops = [{ id: 1, name: "Crop 1" }];
    axios.get
      .mockResolvedValueOnce({ data: mockRules })
      .mockResolvedValueOnce({ data: mockCrops });
    axios.delete.mockResolvedValueOnce();
    render(<ExistingRulesComponent />);
    await waitFor(() => fireEvent.click(screen.getByLabelText("delete_rule")));
    fireEvent.click(screen.getByText("accept"));
    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith("/rules/1"));
  });
});
