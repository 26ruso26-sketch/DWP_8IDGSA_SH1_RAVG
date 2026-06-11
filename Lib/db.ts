import Database from 'better-sqlite3';
import path from 'path';

// Interfaz para definir la estructura de nuestros datos
export interface Usuario {
  id?: number;
  correo: string;
  password?: string;
}

export interface Jugador {
  id?: number;
  nombre: string;
  categoria?: string;
}

// Aplicación estricta de POO (Clases, Encapsulamiento y Métodos)
export class SistemaTorneoDB {
  private db: Database.Database;

  constructor() {
    const dbPath = path.resolve(process.cwd(), 'torneo.db');
    this.db = new Database(dbPath);
    this.inicializarTablas();
  }

  private inicializarTablas(): void {
    const queryUsuarios = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        correo TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `;
    this.db.prepare(queryUsuarios).run();

    const queryJugadores = `
      CREATE TABLE IF NOT EXISTS jugadores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        categoria TEXT
      )
    `;
    this.db.prepare(queryJugadores).run();
  }

  public registrarUsuario(correo: string, password: string): string {
    if (!correo || !correo.includes('@')) {
      throw new Error("Error de Backend: El correo no tiene un formato válido.");
    }
    if (password.length < 4) {
      throw new Error("Error de Backend: La contraseña es demasiado corta.");
    }

    try {
      const stmt = this.db.prepare('INSERT INTO usuarios (correo, password) VALUES (?, ?)');
      stmt.run(correo, password);
      return "Jugador registrado con éxito en el torneo.";
    } catch (error) {
      throw new Error("Error de Backend: Este correo ya está registrado en el torneo.");
    }
  }

  public validarLogin(correo: string, password: string): Usuario | null {
    const stmt = this.db.prepare('SELECT id, correo FROM usuarios WHERE correo = ? AND password = ?');
    const usuario = stmt.get(correo, password) as Usuario | undefined;
    
    return usuario || null;
  }

  // --- MÉTODOS PARA JUGADORES ---

  public obtenerJugadores(): Jugador[] {
    const stmt = this.db.prepare('SELECT id, nombre, categoria FROM jugadores ORDER BY id DESC');
    return stmt.all() as Jugador[];
  }

  public agregarJugador(nombre: string): void {
    if (!nombre || nombre.trim() === '') {
      throw new Error("El nombre del jugador no puede estar vacío.");
    }
    const stmt = this.db.prepare('INSERT INTO jugadores (nombre, categoria) VALUES (?, NULL)');
    stmt.run(nombre.trim());
  }

  public actualizarCategoriaJugador(id: number, categoria: string): void {
    const stmt = this.db.prepare('UPDATE jugadores SET categoria = ? WHERE id = ?');
    stmt.run(categoria, id);
  }
}