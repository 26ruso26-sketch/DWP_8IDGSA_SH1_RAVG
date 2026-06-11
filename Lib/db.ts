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

    // Sembrar 5 jugadores mexicanos si la tabla está vacía
    const countResult = this.db.prepare('SELECT COUNT(*) as count FROM jugadores').get() as { count: number };
    if (countResult && countResult.count === 0) {
      const jugadoresSemilla = [
        { nombre: 'Juan Carlos Pérez', categoria: 'Pro' },
        { nombre: 'Ximena Hernández', categoria: 'Freestyle' },
        { nombre: 'Miguel Ángel Rodríguez', categoria: 'Pro' },
        { nombre: 'Sofía Guadalupe Ruiz', categoria: 'Freestyle' },
        { nombre: 'Francisco Javier López', categoria: 'Pro' }
      ];
      const insertStmt = this.db.prepare('INSERT INTO jugadores (nombre, categoria) VALUES (?, ?)');
      for (const jugador of jugadoresSemilla) {
        insertStmt.run(jugador.nombre, jugador.categoria);
      }
    }
  }

  public registrarUsuario(correo: string, password: string): string {
    if (!correo || !correo.includes('@')) {
      throw new Error("Ese correo se ve un poco raro, ¿podrías revisarlo?");
    }
    if (password.length < 4) {
      throw new Error("¡La contraseña está muy cortita! Debe tener al menos 4 caracteres.");
    }

    try {
      const stmt = this.db.prepare('INSERT INTO usuarios (correo, password) VALUES (?, ?)');
      stmt.run(correo, password);
      return "¡Listo! Ya quedaste registrado para el torneo. ¡Prepárate para bailar!";
    } catch (error) {
      throw new Error("¡Oye! Ese correo ya está registrado. ¿No será que ya tienes cuenta?");
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

  public agregarJugador(nombre: string, categoria: string | null = null): void {
    if (!nombre || nombre.trim() === '') {
      throw new Error("¡Oye! El nombre del jugador no puede estar vacío. Ponle un nombre chido.");
    }
    const stmt = this.db.prepare('INSERT INTO jugadores (nombre, categoria) VALUES (?, ?)');
    stmt.run(nombre.trim(), categoria || null);
  }

  public actualizarCategoriaJugador(id: number, categoria: string): void {
    const stmt = this.db.prepare('UPDATE jugadores SET categoria = ? WHERE id = ?');
    stmt.run(categoria, id);
  }
}