import express from 'express';
import { User, Course } from './app';
 
const app: express.Application = express();
app.use(express.json());

const port: number = 3000;

app.post('/ajouter-user', (req, res) => {
    const { email, password, role } = req.body;
    const nouvelUtilisateur: User = User.create({ email, password, role });
    return res.status(200).json(nouvelUtilisateur);
  });

  app.post('/ajouter-cours', (req, res) => {
    const { title, date } = req.body;
    const nouveauCours: Course = Course.create({ title, date});
    return res.status(200).json(nouveauCours);
  });

  app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express!");
});
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});