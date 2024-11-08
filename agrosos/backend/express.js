import express from "express";
import cors from "cors";
import db from "./db.js";
import bcrypt, { hash } from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

// Plots
app.get("/api/plots", (req, res) => {
  db.query("SELECT * FROM plots", (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});

app.post("/api/plots", (req, res) => {
  const { name, size } = req.body;
  db.query(
    "INSERT INTO plots (name, size) VALUES (?, ?)",
    [name, size],
    (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).json({ id: results.insertId, name, size });
      }
    }
  );
});

app.put("/api/plots/:id", (req, res) => {
  const { id } = req.params;
  const { name, size } = req.body;
  db.query(
    "UPDATE plots SET name = ?, size = ? WHERE id = ?",
    [name, size, id],
    (error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json({ id, name, size });
      }
    }
  );
});

app.delete("/api/plots/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM sensors WHERE plot_id = ?", [id], (error) => {
    if (error) {
      return res.status(500).send("Error al eliminar sensores: " + error);
    }

    db.query("DELETE FROM plots WHERE id = ?", [id], (error) => {
      if (error) {
        return res.status(500).send("Error al eliminar la parcela: " + error);
      }
      return res.status(204).send();
    });
  });
});

// Users
app.get("/users", (req, res) => {
  const query = "SELECT id, name, role, email FROM users";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).send("Error al obtener los usuarios");
    } else {
      res.json(results);
    }
  });
});

app.post("/users", (req, res) => {
  const { name, role, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error al hashear la contraseña:", err);
      return res.status(500).send("Error al registrar el usuario");
    }

    db.query(
      "INSERT INTO users (name, role, email, password) VALUES (?, ?, ?, ?)",
      [name, role, email, hashedPassword],
      (error, results) => {
        if (error) {
          console.error("Error al añadir el usuario:", error);
          res.status(500).send("Error al añadir el usuario");
        } else {
          res.status(201).json({ id: results.insertId, name, role, email, hashedPassword });
        }
      }
    );
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  db.query(
    "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id],
    (error) => {
      if (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).send("Error al actualizar el usuario");
      } else {
        res.json({ id, name, email, role });
      }
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (error) => {
    if (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).send("Error al eliminar el usuario");
    } else {
      res.status(204).send();
    }
  });
});

// Sensors
app.get("/api/sensors", (req, res) => {
  db.query("SELECT * FROM sensors", (error, results) => {
    if (error) {
      console.error("Error ejecutando consulta:", error);
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});

app.post("/api/sensors", (req, res) => {
  const { type, value, date, plot_id } = req.body;
  db.query(
    "INSERT INTO sensors (type, value, date, plot_id) VALUES (?, ?, ?, ?)",
    [type, value, date, plot_id],
    (error, results) => {
      if (error) {
        console.error("Error ejecutando consulta:", error);
        res.status(500).send(error);
      } else {
        res.status(201).json({ id: results.insertId, type, value, date, plot_id });
      }
    }
  );
});

app.put("/api/sensors/:id", (req, res) => {
  const { id } = req.params;
  const { type, value, date, plot_id } = req.body;
  db.query(
    "UPDATE sensors SET type = ?, value = ?, date = ?, plot_id = ? WHERE id = ?",
    [type, value, date, plot_id, id],
    (error) => {
      if (error) {
        console.error("Error ejecutando consulta:", error);
        res.status(500).send(error);
      } else {
        res.json({ id, type, value, date, plot_id });
      }
    }
  );
});

app.delete("/api/sensors/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM sensors WHERE id = ?", [id], (error) => {
    if (error) {
      console.error("Error ejecutando consulta:", error);
      res.status(500).send("Error al eliminar el sensor: " + error);
    } else {
      res.json({ message: `Sensor con ID ${id} eliminado.` });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario con la contraseña hasheada en la base de datos
    // Suponiendo que tienes una función saveUser para guardar los datos
    await saveUser({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error registrando usuario" });
  }});