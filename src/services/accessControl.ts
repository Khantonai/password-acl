import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();



// //Avec ACL guest est un utilisateur qui n'est pas authentifié
// GET    /api/profile/:id : Consultation d'un profil (renvoyez une simple chaine de caractère ces routes sont là pour tester vos acl)
// POST   /api/data       : Création de données (pareil qu'au dessus)
// PUT    /api/data/:id   : Modification de données (pareil qu'au dessus)
// DELETE /api/data/:id   : Suppression de données (pareil qu'au dessus)
ac.grant('guest')
ac.grant('user')
    .extend('guest')
    .readOwn('profile')
    .createOwn('data')
    .updateOwn('data')
    .deleteOwn('data');
ac.grant('admin')
    .extend('user')
    .readAny('profile')
    .createAny('data')
    .updateAny('data')
    .deleteAny('data');



export { ac };
