import low, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';


const adapter = new FileSync('db/db.json');
const db = low(adapter) as LowdbSync<{ courses: Course[], users: User[] }>;

db.defaults({ courses: [], users: []});

interface User {
  id: number,
  email: string,
  password: string,
  role: string,
}
interface Course {
  id: number,
  title: string,
  date: string,
}

let lastUserId = db.get('users').size().value();
const User = {
  create: ({ email, password, role }: { email: string; password: string; role: string }): User => {
    try {
      const id = (++lastUserId);
      const utilisateur: User = { id, email, password, role };
      db.get('users').push(utilisateur).write();
      return utilisateur;
    } catch (error) {
      console.error('Erreur lors de l\'écriture dans la base de données :', error);
      throw new Error('Erreur lors de la création de l\'utilisateur');
    }
  },
}

let lastCourseId = db.get('courses').size().value();
const Course = {
  create: ({ title, date }: { title: string; date: string }): Course => {
    try {
      const id = (++lastCourseId);
      console.log('ID du cours à ajouter :', id);
      
      const cours: Course = { id, title, date };
      console.log('Données du cours à ajouter :', cours);
      
      db.get('courses').push(cours).write();
      
      console.log('Cours ajouté avec succès !');
      console.log('Données du cours ajouté :', cours);
      return cours;

    } catch (error) {
      console.error('Erreur lors de l\'écriture dans la base de données :', error);
      throw new Error('Erreur lors de la création du cours');
    }
  },
}



export {
  User, Course
}

// fonction qui créée un nouveau cours

//fonction qui attribu un cours à un étudiant

//fonction qui permet à un étudiant de signer sa présence à un cours

//Voir la gestion d'erreur

//voir l'authentification (openclassroom ?)




 /*
interface students_courses{
registeredAt: string,
signedAt: string,
}*/

/*
let lastPersonId = 0;

const Person = {
  create: ({ nom, prenom, age }: { nom: string; prenom: string; age: number }): Person => {
    const id = (++lastPersonId).toString();
    const personne: Person = { id, nom, prenom, age };
    db.get('personnes').push(personne).write();
    return personne;
  },
  getById: (id: string): Person | undefined => db.get('personnes').find({ id }).value(),
};

app.post('/ajouter-personne', (req: Request, res: Response) => {
  const { nom, prenom, age } = req.body;
  const nouvellePersonne: Person = Person.create({ nom, prenom, age });
  res.json(nouvellePersonne);
});

app.get('/personne/:id', (req: Request, res: Response) => {
  const personne: Person | undefined = Person.getById(req.params.id);
  if (!personne) {
    res.status(404).json({ message: 'Personne non trouvée' });
  } else {
    res.json(personne);
  }
});
*/