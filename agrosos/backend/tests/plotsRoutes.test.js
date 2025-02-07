import request from "supertest";
import app from "../express.js";

describe("Plots API", () => {
  let plotId;
  let authToken;

  it("Debe hacer login y obtener un token", async () => {
    const credentials = Buffer.from("chano@chano:1234").toString("base64");

    const res = await request(app)
      .post("/api/auth/login")
      .set("Authorization", `Basic ${credentials}`); // Agregar Basic Auth

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    authToken = res.body.token;
  });

  it("Debe obtener la lista de plots", async () => {
    const res = await request(app)
      .get("/api/plots")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });

  it("Debe crear un nuevo plot", async () => {
    const res = await request(app)
      .post("/api/plots")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Mi parcela",
        size: 100,
        color: "#abcdef",
        user_id: 127,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    plotId = res.body.id;
  });

  it("Debe obtener la lista con el nuevo plot", async () => {
    const res = await request(app)
      .get("/api/plots")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(res.body.some(plot => plot.name === "Mi parcela")).toBe(true);
  });

  it("Debe actualizar un plot existente", async () => {
    const res = await request(app)
      .put(`/api/plots/${plotId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Parcela actualizada", size: 150, color: "#abcd3f" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Parcela actualizada");
    expect(res.body.size).toBe(150);
  });

  it("Debe obtener la lista con el nuevo plot actualizado", async () => {
    const res = await request(app)
      .get("/api/plots")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(res.body.some(plot => plot.name === "Parcela actualizada")).toBe(true);
  });

  it("Debe eliminar un plot", async () => {
    const res = await request(app)
      .delete(`/api/plots/${plotId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);

    // Verificar que el plot ya no existe
    const resGet = await request(app)
      .get(`/api/plots/${plotId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(resGet.statusCode).toBe(404);
  });
});
