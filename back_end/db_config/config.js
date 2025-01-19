const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SECRETS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_SECRETS.project_id}.firebaseio.com`
});

const db = admin.firestore();

module.exports = { db };