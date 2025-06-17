// src/middleware/checkPermission.ts
import { ac } from '../services/accessControl.js'
import { createMiddleware } from 'hono/factory'

export const checkPermission = (action: 'readAny' | 'readOwn' | 'createOwn' | 'updateOwn' | 'deleteOwn' | 'createAny' | 'updateAny' | 'deleteAny', resource: string) => {
  return createMiddleware(async (c, next) => {
    const user = c.get('user') // injecté par authMiddleware

    const permission = ac.can(user.role)[action](resource)
    if (!permission.granted) {
      return c.json({ error: 'Accès interdit pour ce rôle' }, 403)
    }

    await next()
  })
}