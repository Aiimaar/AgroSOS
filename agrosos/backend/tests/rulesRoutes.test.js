import request from "supertest";
import app from "../express.js";

describe("Rules API", () => {
  let authToken;
  let ruleId;
  let cropId = 1;

  it("Debe hacer login y obtener un token", async () => {
    const credentials = Buffer.from("chano@chano:1234").toString("base64");

    const res = await request(app)
      .post("/api/auth/login")
      .set("Authorization", `Basic ${credentials}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    authToken = res.body.token;
  });

  it("Debe obtener la lista de reglas", async () => {
    const res = await request(app)
      .get("/api/rules")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Debe crear una nueva regla", async () => {
    const res = await request(app)
      .post("/api/rules")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Regla de prueba",
        crop_id: cropId,
        sensor: "Humedad",
        condition: "<",
        value: 30,
        unit: "%",
        actuator: "Riego",
        actuator_option: "Encender",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    ruleId = res.body.id;
  });

  it("Debe obtener una regla por ID", async () => {
    const res = await request(app)
      .get(`/api/rules/${ruleId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(ruleId);
  });

  it("Debe obtener reglas por crop_id", async () => {
    const res = await request(app)
      .get(`/api/rules/crop?crop_id=${cropId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Debe actualizar una regla", async () => {
    const res = await request(app)
      .put(`/api/rules/${ruleId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Regla actualizada",
        value: 40,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Regla actualizada");
    expect(res.body.value).toBe(40);
  });

  it("Debe eliminar una regla", async () => {
    const res = await request(app)
      .delete(`/api/rules/${ruleId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);

    const resGet = await request(app)
      .get(`/api/rules/${ruleId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(resGet.statusCode).toBe(404);
  });
});
