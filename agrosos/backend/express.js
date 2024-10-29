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
  
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
