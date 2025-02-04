import request from "supertest";
import app from "../express.js";

describe("Plots API", () => {
  let plotId;

  it("Debe obtener la lista de plots", async () => {
    const res = await request(app).get("/api/plots");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });

  it("Debe crear un nuevo plot", async () => {
    const res = await request(app)
      .post("/api/plots")
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
    const res = await request(app).get("/api/plots");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(res.body.some(plot => plot.name === "Mi parcela")).toBe(true);
  });

  it("Debe actualizar un plot existente", async () => {
    const res = await request(app)
      .put(`/api/plots/${plotId}`)
      .send({ name: "Parcela actualizada", size: 150, color: "#abcd3f" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Parcela actualizada");
    expect(res.body.size).toBe(150);
  });

  it("Debe obtener la lista con el nuevo plot atualizado", async () => {
    const res = await request(app).get("/api/plots");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(res.body.some(plot => plot.name === "Parcela actualizada")).toBe(true);
  });

  it("Debe eliminar un plot", async () => {
    const res = await request(app).delete(`/api/plots/${plotId}`);
    expect(res.statusCode).toBe(200);
  
    // Verificar que el plot ya no existe
    const resGet = await request(app).get(`/api/plots/${plotId}`);
    expect(resGet.statusCode).toBe(404);
  });  
});