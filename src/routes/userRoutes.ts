import { Router, Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];

const router: Router = Router();

// POST
router.post('/users', (req: Request, res: Response) => {
  const user: User = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.status(201).send(user);
});

// GET
router.get('/users', (req: Request, res: Response) => {
  res.send(users);
});

router.get('/users/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send({ message: 'Usuário não encontrado' });
  }
  res.send(user);
});

// PUT
router.put('/users/:id', (req: Request, res: Response) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send({ message: 'Usuário não encontrado' });
  }

  const updatedUser: User = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;
  res.send(updatedUser);
});

// DELETE
router.delete('/users/:id', (req: Request, res: Response) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send({ message: 'Usuário não encontrado' });
  }
  
  users.splice(userIndex, 1);
  res.status(204).send();
});

export default router;
