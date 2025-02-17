const { google } = require('googleapis');
const path = require('path');

// Ruta al archivo JSON de la clave privada de la cuenta de servicio
const keyFilePath = path.join(__dirname, 'keycloakdemo-1733841773184-c35ebc2e873b.json');

async function generateIdToken() {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/userinfo.email'],
  });

  // Obtener el ID Token
  const client = await auth.getClient();
  const idToken = await client.idTokenUrl({
    url: 'https://accounts.google.com/o/oauth2/token',
    audience: '162707826213-so31sae6bmap0i14ihjtir5qh1c52ir3.apps.googleusercontent.com',
  });

  console.log('Generated ID Token:', idToken);
}

generateIdToken();
