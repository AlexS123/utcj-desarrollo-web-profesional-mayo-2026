import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PageHeader from './components/PageHeader.jsx';
import Icon from './components/Icon.jsx';
import { fetchUsers, formatDate, roleClass, userId } from './api';

const COLUMNAS = [
  { key: 'user', label: 'Usuario' },
  { key: 'rol', label: 'Rol' },
  { key: 'createdAt', label: 'Registrado' },
  { key: 'updatedAt', label: 'Actualizado' },
  { key: 'id', label: 'ID', sortable: false },
];

/**
 * Admin Config: vista de solo lectura de los usuarios registrados.
 * No modifica nada; para cambiar roles o eliminar cuentas está /admin.
 */
function AdminConfig() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [rolFiltro, setRolFiltro] = useState('todos');
  const [orden, setOrden] = useState({ key: 'createdAt', dir: 'desc' });

  const cargar = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      setUsers([]);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const roles = useMemo(() => {
    const set = new Set(users.map((u) => String(u.rol || 'user').toLowerCase()));
    return ['todos', ...set];
  }, [users]);

  const resumen = useMemo(() => {
    const cuenta = (rol) =>
      users.filter((u) => String(u.rol || '').toLowerCase() === rol).length;

    const fechas = users
      .map((u) => (u.createdAt ? new Date(u.createdAt).getTime() : 0))
      .filter(Boolean);

    return {
      total: users.length,
      root: cuenta('root'),
      admin: cuenta('admin'),
      user: users.length - cuenta('root') - cuenta('admin'),
      ultimo: fechas.length ? formatDate(new Date(Math.max(...fechas))) : '—',
    };
  }, [users]);

  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    const filtrados = users.filter((u) => {
      const rol = String(u.rol || '').toLowerCase();
      const coincideRol = rolFiltro === 'todos' || rol === rolFiltro;
      const coincideTexto =
        !texto ||
        String(u.user || '').toLowerCase().includes(texto) ||
        String(userId(u) || '').toLowerCase().includes(texto);

      return coincideRol && coincideTexto;
    });

    const factor = orden.dir === 'asc' ? 1 : -1;

    return [...filtrados].sort((a, b) => {
      if (orden.key === 'createdAt' || orden.key === 'updatedAt') {
        const va = a[orden.key] ? new Date(a[orden.key]).getTime() : 0;
        const vb = b[orden.key] ? new Date(b[orden.key]).getTime() : 0;
        return (va - vb) * factor;
      }

      const va = String(a[orden.key] || '').toLowerCase();
      const vb = String(b[orden.key] || '').toLowerCase();
      return va.localeCompare(vb) * factor;
    });
  }, [users, busqueda, rolFiltro, orden]);

  const ordenarPor = (key) => {
    setOrden((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }
    );
  };

  const flecha = (key) => {
    if (orden.key !== key) return '';
    return orden.dir === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Admin Config"
        icon="settings"
        title="Usuarios"
        accent="registrados"
        lead="Consulta de solo lectura del padrón de cuentas: roles, fechas de registro e identificadores. Para modificar roles o eliminar cuentas usa el panel de administración."
      >
        <button type="button" className="btn btn-secondary btn-sm" onClick={cargar} disabled={loading}>
          <Icon name="refresh" size={16} />
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
        <Link className="btn btn-ghost btn-sm" to="/admin">
          <Icon name="shield" size={16} />
          Ir a gestión
        </Link>
      </PageHeader>

      <section className="section">
        <div className="stats-grid">
          <div className="stat-card">
            <strong>{loading ? '—' : resumen.total}</strong>
            <span>Usuarios totales</span>
          </div>
          <div className="stat-card">
            <strong>{loading ? '—' : resumen.root}</strong>
            <span>Cuentas root</span>
          </div>
          <div className="stat-card">
            <strong>{loading ? '—' : resumen.admin}</strong>
            <span>Administradores</span>
          </div>
          <div className="stat-card">
            <strong>{loading ? '—' : resumen.user}</strong>
            <span>Usuarios estándar</span>
          </div>
        </div>
        <p className="field-hint mt-2">
          <Icon name="clock" size={14} /> Último registro: {loading ? '—' : resumen.ultimo}
        </p>
      </section>

      {error && (
        <div className="alert alert--error mb-2">
          <Icon name="alert" size={18} />
          <div>
            <strong>No se pudieron cargar los usuarios.</strong>
            <p style={{ marginTop: 4 }}>{error}</p>
          </div>
        </div>
      )}

      <section className="section">
        <div className="section-heading section-heading--row">
          <div>
            <h2>Padrón de cuentas</h2>
            <p>
              {loading
                ? 'Consultando el servidor...'
                : `Mostrando ${visibles.length} de ${users.length} registros`}
            </p>
          </div>

          <div className="row">
            <div className="chip-row">
              {roles.map((rol) => (
                <button
                  key={rol}
                  type="button"
                  className={`chip chip-filter${rolFiltro === rol ? ' is-active' : ''}`}
                  onClick={() => setRolFiltro(rol)}
                >
                  {rol}
                </button>
              ))}
            </div>

            <label className="search-input">
              <Icon name="search" size={16} />
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar usuario o ID..."
                aria-label="Buscar usuario"
              />
            </label>
          </div>
        </div>

        {loading ? (
          <div className="panel stack">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="skeleton" style={{ width: `${90 - i * 8}%` }} />
            ))}
          </div>
        ) : visibles.length === 0 ? (
          <div className="empty-state">
            <span className="card-icon">
              <Icon name="users" size={20} />
            </span>
            <h3>Sin usuarios que mostrar</h3>
            <p>
              {users.length === 0
                ? 'Todavía no hay cuentas registradas en la base de datos.'
                : 'Ningún usuario coincide con el filtro actual.'}
            </p>
            {users.length > 0 && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setBusqueda('');
                  setRolFiltro('todos');
                }}
              >
                <Icon name="refresh" size={16} />
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {COLUMNAS.map((col) => (
                    <th
                      key={col.key}
                      className={col.sortable === false ? undefined : 'sortable'}
                      onClick={col.sortable === false ? undefined : () => ordenarPor(col.key)}
                    >
                      {col.label}
                      {col.sortable === false ? '' : flecha(col.key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibles.map((u) => (
                  <tr key={userId(u)}>
                    <td>
                      <span className="cell-user">
                        <span className="avatar">
                          {String(u.user || '?').slice(0, 2).toUpperCase()}
                        </span>
                        {u.user}
                      </span>
                    </td>
                    <td>
                      <span className={roleClass(u.rol)}>{u.rol || 'user'}</span>
                    </td>
                    <td>{formatDate(u.createdAt)}</td>
                    <td>{formatDate(u.updatedAt)}</td>
                    <td className="cell-mono">{userId(u)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="section">
        <div className="grid grid-2">
          <article className="panel">
            <h3 className="mb-2">
              <Icon name="database" size={17} /> Origen de los datos
            </h3>
            <ul className="bullet-list">
              <li>
                Endpoint: <span className="text-mono">GET /consultarUsuarios</span>
              </li>
              <li>Campos expuestos: user, rol, createdAt, updatedAt</li>
              <li>Las contraseñas nunca salen del servidor</li>
              <li>Requiere token JWT con rol admin o root</li>
            </ul>
          </article>

          <article className="panel panel--glow">
            <h3 className="mb-2">
              <Icon name="key" size={17} /> Roles disponibles
            </h3>
            <div className="stack">
              <div className="row">
                <span className="badge badge--root">root</span>
                <span className="field-hint">Acceso total, incluida la gestión de usuarios.</span>
              </div>
              <div className="row">
                <span className="badge badge--admin">admin</span>
                <span className="field-hint">Puede consultar y administrar cuentas.</span>
              </div>
              <div className="row">
                <span className="badge badge--user">user</span>
                <span className="field-hint">Acceso al sitio y a la comunidad.</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}

export default AdminConfig;
