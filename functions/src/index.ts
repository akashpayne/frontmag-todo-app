import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const cleanTodos = functions.https.onRequest((req, res) => {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  res.header('Content-type', 'text/json');

  let output = [];
  admin.firestore().collection('/todos')
    .where('updatedAt', '<', date)
    .where('complete', '==', true)
    .get()
    .then(snapshots => {
      snapshots.forEach(doc => {
        admin.firestore().collection('/todos').doc(doc.id).delete()
          .then(() => {
            console.log('Item deleted:', doc.id);
          })
          .catch(err => {
            console.error('error', err.toString());
          });
        output.push({
          id: doc.id
        });
      });
      res.send(JSON.stringify(output));
    })
    .catch(err => {
      console.error('error', err.toString());
      res.send('{error: "' + err.toString() + '"}');
    });
});