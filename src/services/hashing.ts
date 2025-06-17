// Ici dénissez les fonctions qui vont vous permettre de vérifier et générer des mots de passes sécurisés
// import crypto from 'crypto';
import argon2 from 'argon2';


// export const hashPassword = async (password: string): Promise<{ password: string, salt: string }> => {
//   const salt = crypto.randomBytes(16).toString('hex');
//   const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
//   return { password: hashedPassword, salt };
// };

export const hashPassword = async (password: string): Promise<string> => {
    try {
        // argon2.hash applique le hachage automatiquement avec un sel généré
        return await argon2.hash(password);
    } catch (err) {
        throw new Error("Erreur lors du hachage du mot de passe");
    }
};

export const verifyPassword = async (hashedPassword: string, password: string): Promise<boolean> => {
    try {
        return await argon2.verify(hashedPassword, password);
    } catch (err) {
        return false;
    }
};
