import request from "supertest";
import app from "../express.js";

describe("Users API", () => {
  let userId;
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

  it("Debe obtener la lista de usuarios", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });

  it("Debe crear un nuevo usuario", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Carlos",
        email: "carlos@example.com",
        password: "password123",
        role: "Admin", // El campo 'role' también es necesario
        profile_image: null, // Esto es opcional
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    userId = res.body.id;
  });

  it("Debe obtener la lista de usuarios con el nuevo usuario", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body.some((user) => user.email === "carlos@example.com")).toBe(
      true
    );
  });

  it("Debe actualizar un usuario existente", async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Carlos Actualizado",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Carlos Actualizado");
  });

  it("Debe obtener la lista de usuarios con el usuario actualizado", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.some((user) => user.name === "Carlos Actualizado")).toBe(
      true
    );
  });

  it("Debe eliminar un usuario", async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(
      `Usuario con ID ${userId} eliminado correctamente.`
    );

    // Verificar que el usuario ya no existe
    const resGet = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(resGet.statusCode).toBe(404); // No debe existir el usuario
  });
});
