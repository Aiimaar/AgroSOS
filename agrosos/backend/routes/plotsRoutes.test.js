import request from "supertest";
import app from "../express.js";
import sequelize from "../db.js";

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reinicia la BD antes de las pruebas
});

afterAll(async () => {
  await sequelize.close(); // Cierra la conexión al final
});

describe("Plots API", () => {
  let plotId;

  it("Debe obtener una lista vacía de parcelas", async () => {
    const res = await request(app).get("/api/plots");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("Debe crear una nueva parcela", async () => {
    const res = await request(app)
      .post("/api/plots")
      .send({
        name: "Mi parcela",
        size: 100,
        color: "#abcdef",
        farmer_id: 127,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    plotId = res.body.id;
  });

  it("Debe obtener la lista con la nueva parcela", async () => {
    const res = await request(app).get("/api/plots");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Mi parcela");
  });

  it("Debe actualizar una parcela existente", async () => {
    const res = await request(app)
      .put(`/api/plots/${plotId}`)
      .send({ name: "Parcela actualizada", size: 150 });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Parcela actualizada");
    expect(res.body.size).toBe(150);
  });

  it("Debe eliminar una parcela", async () => {
    const res = await request(app).delete(`/api/plots/${plotId}`);
    expect(res.statusCode).toBe(200);

    const resAfterDelete = await request(app).get("/api/plots");
    expect(resAfterDelete.body.length).toBe(0);
  });
});
