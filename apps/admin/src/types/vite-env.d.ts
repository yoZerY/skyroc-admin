/**
 * Namespace Env
 *
 * It is used to declare the type of the import.meta object
 */
declare namespace Env {
  interface ImportMeta extends ImportMetaEnv {}
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
