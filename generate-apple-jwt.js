const jwt = require('jsonwebtoken');
const fs = require('fs'); // Para leer la clave privada desde un archivo

// Configuración requerida
const privateKeyPath = 'KeyCloakBeta2-20250214-AuthKey_VNJ93CGL7R.p8'; // Ruta al archivo de clave privada descargada de Apple
const teamId = 'TEAMID123456'; // Tu Team ID de Apple
const clientId = 'com.eltiempo.ssobeta'; // Tu Client ID (generalmente el Bundle ID)
const keyId = 'VNJ93CGL7R'; // Tu Key ID de la clave privada

// Cargar la clave privada
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// Generar el payload del JWT
const payload = {
    iss: teamId,
    iat: Math.floor(Date.now() / 1000), // Tiempo de emisión (en segundos desde la época Unix)
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365), // Expira en 1 año
    aud: 'https://appleid.apple.com', // Audiencia fija de Apple
    sub: clientId,
};

// Opciones adicionales para el token
const options = {
    algorithm: 'ES256', // Algoritmo de firma requerido por Apple
    keyid: keyId, // El Key ID de la clave privada
};

// Generar el JWT
function generateAppleJWT() {
    try {
        const token = jwt.sign(payload, privateKey, options);
        console.log(token);
        return token;
    } catch (err) {
        console.error('Error generating Apple JWT:', err);
        process.exit(1);
    }
}

// Ejecutar la función para generar el token
generateAppleJWT();
