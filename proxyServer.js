const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/upload', async (req, res) => {
  try {
    const response = await fetch('AKfycbx5DxC9oPFZcdXZnZXbqLClh7b_QcyF0TstIjbh', {
      method: 'POST',
      body: req.body,
      headers: {
        'Content-Type': 'image/png',
      },
    });

    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Erro no proxy: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server rodando em http://localhost:${PORT}`);
});