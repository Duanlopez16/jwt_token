const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');

const app = express();
const port = 3000;

// Reemplaza con tus credenciales de Google Cloud Console
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el flujo de autenticación con Google
app.get('/auth/google', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
  res.redirect(authUrl);
});

// Callback de Google después de la autenticación
app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Intercambiar el código de autorización por tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Obtener el ID Token
    const idToken = tokens.id_token;
    res.send(`ID Token: ${idToken}`);
  } catch (error) {
    console.error('Error al obtener tokens:', error);
    res.status(500).send('Error al autenticar con Google');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});