import { Hono } from "hono";
import {checkPermission} from "../middleware/permission.js";
import { getUser, userExist } from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js";

const route = new Hono();

route.get('/profile/:id', authMiddleware, checkPermission("readOwn", "profile"), (c) => {
  return c.json({
    message: `Consultation du profil avec le user name`,
  });
});
route.get('/profile', authMiddleware, checkPermission("readAny", "profile"), (c) => {
  return c.json({
    message: `Consultation du profil avec le user name`,
  });
});

route.post('/data', authMiddleware, checkPermission("createOwn", "data"), (c) => {
  return c.json({
    message: 'Création de données'
  });
});

route.put('/data/:id',authMiddleware, checkPermission("updateOwn", "data"), (c) => {
  return c.json({
    message: `Modification des données avec l'ID ${c.req.param('id')}`
  });
});

route.delete('/data/:id',authMiddleware, checkPermission("deleteOwn", "data"), (c) => {
  return c.json({
    message: `Suppression des données avec l'ID ${c.req.param('id')}`
  });
});

export default route;
