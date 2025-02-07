import request from "supertest";
import app from "../express.js";

describe("Rules API", () => {
  let authToken;
  let ruleId;
  const cropId = 1;
  const technicianId = 93;

  beforeAll(async () => {
    const credentials = Buffer.from("pepe@gmail.com:1234").toString("base64");
    const loginRes = await request(app)
      .post("/api/auth/login")
      .set("Authorization", `Basic ${credentials}`);

    if (loginRes.statusCode !== 200 || !loginRes.body.token) {
      throw new Error("Login failed.  Cannot run tests without a valid token.");
    }
    authToken = loginRes.body.token;
  });

  it("Debe obtener la lista de reglas (con autenticación)", async () => {
    const res = await request(app)
      .get("/api/rules")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Debe crear una nueva regla (con autenticación)", async () => {
    const newRule = {
      name: "Regla de prueba",
      crop_id: cropId,
      technician_id: technicianId,
      rule_info: JSON.stringify({
        AND: [
          {
            conditions: [{ type: "humedad", value: 3, operator: "<" }],
            actions: ["activar_ventilacion"],
            sensors: [{ type: "humedad" }],
            actuators: [{ type: "ventilacion" }],
          },
        ],
      }),
    };
    const res = await request(app)
      .post("/api/rules")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newRule);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(newRule.name);
    expect(parseInt(res.body.crop_id)).toBe(newRule.crop_id);
    expect(parseInt(res.body.technician_id)).toBe(newRule.technician_id);
    expect(JSON.parse(res.body.rule_info)).toEqual(JSON.parse(newRule.rule_info));
    ruleId = res.body.id;
  });

  it("Debe obtener una regla por ID (con autenticación)", async () => {
    const res = await request(app)
      .get(`/api/rules/${ruleId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(ruleId);
  });

  it("Debe obtener reglas por crop_id (con autenticación)", async () => {
    const res = await request(app)
      .get(`/api/rules/crop?crop_id=${cropId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Debe actualizar una regla (con autenticación)", async () => {
    const updatedRule = {
      name: "Regla actualizada",
      rule_info: JSON.stringify({
        AND: [
          {
            conditions: [{ type: "humedad", value: 10, operator: ">" }],
          },
        ],
      }),
    };
    const res = await request(app)
      .put(`/api/rules/${ruleId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updatedRule);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedRule.name);
    expect(JSON.parse(res.body.rule_info)).toEqual(JSON.parse(updatedRule.rule_info));
  });

  it("Debe eliminar una regla (con autenticación)", async () => {
    const res = await request(app)
      .delete(`/api/rules/${ruleId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toBe(204); // Corregido: Esperar 204

    const resGet = await request(app)
      .get(`/api/rules/${ruleId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(resGet.statusCode).toBe(404);
  });
});