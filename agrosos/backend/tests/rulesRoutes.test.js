import request from "supertest";
import app from "../express.js"; // Asegúrate de que la ruta a tu archivo express.js sea correcta
import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import * as ruleController from '../controllers/ruleController.js';

// Mockea el controlador y el middleware
vi.mock('../controllers/ruleController.js', () => ({
    getAllRules: vi.fn(),
    getRuleById: vi.fn(),
    getRulesByCrop: vi.fn(),
    createRule: vi.fn(),
    updateRule: vi.fn(),
    deleteRule: vi.fn(),
}));

vi.mock('../middleware/authenticateToken.js', () => ({
    authenticateToken: (req, res, next) => {
        req.user = { id: 1 }; // Simula un usuario autenticado
        next();
    },
}));

describe("Rules API", () => {
    let authToken;

    // Simula un login exitoso para obtener un token *antes* de los tests de las reglas.
    beforeEach(async () => {
        // Podrías tener un endpoint de login real, o simularlo aquí.  Este es un ejemplo *simplificado*.
        // En una app real, *no* hardcodees credenciales.
        const credentials = Buffer.from("chano@chano:1234").toString("base64");
        const loginRes = await request(app)
            .post("/api/auth/login")
            .set("Authorization", `Basic ${credentials}`);
          if (loginRes.statusCode === 200 && loginRes.body.token) {
            authToken = loginRes.body.token;
          } else {
            //Si no se puede hacer login, los test no van a funcionar, por lo que es mejor lanzar un error.
            throw new Error("Login failed in beforeEach.  Cannot get auth token. Check your login mock/endpoint.");
          }

    });

    afterEach(() => {
        vi.clearAllMocks(); // Limpia los mocks después de cada test
    });

    it("Debe obtener todas las reglas", async () => {
        // Simula el comportamiento del controlador
        ruleController.getAllRules.mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, name: "Rule 1" }]);
        });

        const res = await request(app)
            .get("/api/rules")
            .set("Authorization", `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 1, name: "Rule 1" }]);
        expect(ruleController.getAllRules).toHaveBeenCalled(); //Verifica que se ha llamado a la funcion
    });

    it("Debe obtener reglas por crop_id", async () => {
        ruleController.getRulesByCrop.mockImplementation((req, res) => {
          res.status(200).json([{ id: 1, name: "Rule 1", crop_id: 1 }]);
        });

        const res = await request(app)
            .get("/api/rules/crop?crop_id=1") // Usa query parameters
            .set("Authorization", `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 1, name: "Rule 1", crop_id: 1 }]);
        expect(ruleController.getRulesByCrop).toHaveBeenCalled();
    });

    it("Debe obtener una regla por id", async () => {
        ruleController.getRuleById.mockImplementation((req, res) => {
            res.status(200).json({ id: 1, name: "Rule 1" });
        });

        const res = await request(app)
            .get("/api/rules/1")
            .set("Authorization", `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 1, name: "Rule 1" });
        expect(ruleController.getRuleById).toHaveBeenCalled();
    });

    it("Debe crear una nueva regla", async () => {
        ruleController.createRule.mockImplementation((req, res) => {
            res.status(201).json({ id: 3, name: "New Rule", ...req.body });
        });

        const newRule = { name: "New Rule", crop_id: 2, rule_info: "..." };
        const res = await request(app)
            .post("/api/rules")
            .set("Authorization", `Bearer ${authToken}`)
            .send(newRule);

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ id: 3, ...newRule });
        expect(ruleController.createRule).toHaveBeenCalled();
    });

    it("Debe actualizar una regla existente", async () => {
        ruleController.updateRule.mockImplementation((req, res) => {
              res.status(200).json({ id: 1, name: "Updated Rule", ...req.body });
          });

        const updatedRule = { name: "Updated Rule", crop_id: 1 };
        const res = await request(app)
            .put("/api/rules/1")
            .set("Authorization", `Bearer ${authToken}`)
            .send(updatedRule);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 1, ...updatedRule });
        expect(ruleController.updateRule).toHaveBeenCalled();
    });

    it("Debe eliminar una regla", async () => {
        ruleController.deleteRule.mockImplementation((req, res) => {
            res.status(204).send(); // 204 No Content para eliminaciones exitosas
        });

        const res = await request(app)
            .delete("/api/rules/1")
            .set("Authorization", `Bearer ${authToken}`);

        expect(res.statusCode).toBe(204);
        expect(res.body).toEqual({}); // No Content, el body debe estar vacío.
        expect(ruleController.deleteRule).toHaveBeenCalled();
    });
});