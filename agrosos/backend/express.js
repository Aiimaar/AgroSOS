import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/plots', (req, res) => {
    db.query('SELECT * FROM plots', (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(results);
        }
    });
});

app.post('/api/plots', (req, res) => {
    const { name, size } = req.body;
    db.query('INSERT INTO plots (name, size) VALUES (?, ?)', [name, size], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).json({ id: results.insertId, name, size });
        }
    });
});

app.put('/api/plots/:id', (req, res) => {
    const { id } = req.params;
    const { name, size } = req.body;
    db.query('UPDATE plots SET name = ?, size = ? WHERE id = ?', [name, size, id], (error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json({ id, name, size });
        }
    });
});

app.delete('/api/plots/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM sensors WHERE plot_id = ?', [id], (error) => {
        if (error) {
            return res.status(500).send('Error al eliminar sensores: ' + error);
        }

        db.query('DELETE FROM plots WHERE id = ?', [id], (error) => {
            if (error) {
                return res.status(500).send('Error al eliminar la parcela: ' + error);
            }
            return res.status(204).send();
        });
    });
});

// Corregido: Usar `db.query` en lugar de `connection.query`
app.get('/users', (req, res) => {
    const query = 'SELECT id, name, role, email FROM users';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).send('Error al obtener los usuarios');
        } else {
            res.json(results);
        }
    });
});

app.post('/users', (req, res) => {
  const { name, email, role } = req.body; // Asegúrate de que estos campos sean correctos
  db.query('INSERT INTO users (name, email, role) VALUES (?, ?, ?)', [name, email, role], (error, results) => {
      if (error) {
          console.error('Error al añadir el usuario:', error);
          res.status(500).send('Error al añadir el usuario');
      } else {
          res.status(201).json({ id: results.insertId, name, email, role });
      }
  });
});

// Ruta para actualizar un usuario
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body; // Asegúrate de que estos campos sean correctos

  db.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id], (error) => {
      if (error) {
          console.error('Error al actualizar el usuario:', error);
          res.status(500).send('Error al actualizar el usuario');
      } else {
          res.json({ id, name, email, role });
      }
  });
});


// Ruta para eliminar un usuario
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM users WHERE id = ?', [id], (error) => {
      if (error) {
          console.error('Error al eliminar el usuario:', error);
          res.status(500).send('Error al eliminar el usuario');
      } else {
          res.status(204).send(); // No content
      }
  });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
