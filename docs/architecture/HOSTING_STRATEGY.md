# Estrategia de hosting

## Decisión

AI Forge usa tres capas distintas:

1. **GitHub privado** como fuente de verdad y auditoría cuando se conecte un
   remoto saneado.
2. **Vercel** como producción web recomendada para el producto público/cliente,
   previews por rama, dominios y CI/CD.
3. **Sites** como panel privado y entorno de validación integrado en
   Codex/ChatGPT. Cada URL desplegada sigue siendo una versión de producción
   para Sites, aunque su función en nuestra arquitectura sea de staging interno.

GitHub Pages queda para documentación o demos estáticas sin backend.

## Por qué se usó Sites primero

- Permitía desplegar desde el workspace sin publicar el repositorio.
- Aportaba autenticación de propietario y D1 para un control plane privado.
- Evitaba conectar GitHub o Vercel antes de revisar la biblioteca sensible.
- El proyecto ya tenía identidad Sites en `.openai/hosting.json`, por lo que se
  reutilizó en lugar de crear otro despliegue.

Sites no es “mejor” por defecto. Fue el destino más seguro para el primer panel
privado y funcional.

## Cuándo mover a Vercel

Mover la superficie de producto a Vercel cuando:

- exista repositorio GitHub privado saneado;
- estén separadas las variables por entorno;
- haya dominio y audiencia definidos;
- el backend y la política de datos estén decididos;
- CI, pruebas, previews y rollback formen parte del workflow.

## Regla de backend

- D1 actual: suficiente para registro, auditoría y staging personal.
- Postgres gestionado: adoptar cuando haya relaciones complejas, concurrencia,
  analítica, permisos multiusuario o reporting operativo.
- MCP local: nunca desplegarlo como API pública general; usar un gateway con
  identidad, allowlist, límites y logs saneados.

## No negociable

El despliegue web nunca incluye raíces locales, secretos, capturas de cuenta,
memorias de chat, material privado ni políticas con rutas exactas.
