import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PageHeader from './components/PageHeader.jsx';
import Icon from './components/Icon.jsx';
import { deleteUser, fetchUsers, formatDate, roleClass, updateUserRole, userId } from './api';
import useCurrentUser from './useCurrentUser';

function Admin() {
  const { name } = useCurrentUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [aviso, setAviso] = useState(null);
  const [confirmar, setConfirmar] = useState(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      setUsers(await fetchUsers());
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

  useEffect(() => {
    if (!aviso) return;
    const timer = window.setTimeout(() => setAviso(null), 3000);
    return () => window.clearTimeout(timer);
  }, [aviso]);

  const resumen = useMemo(() => {
    const cuenta = (rol) => users.filter((u) => String(u.rol || '').toLowerCase() === rol).length;
    return {
      total: users.length,
      root: cuenta('root'),
      admin: cuenta('admin'),
      user: users.length - cuenta('root') - cuenta('admin'),
    };
  }, [users]);

  const cambiarRol = async (id, rol) => {
    setBusyId(id);
    try {
      const data = await updateUserRole(id, rol);
      const actualizado = data && data.usuario;
      setUsers((prev) => prev.map((u) => (userId(u) === id ? actualizado || { ...u, rol } : u)));
      setAviso({ type: 'success', text: `Rol actualizado a "${rol}".` });
    } catch (e) {
      setAviso({ type: 'error', text: e.message });
    } finally {
      setBusyId(null);
    }
  };

  const eliminar = async (id) => {
    setBusyId(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => userId(u) !== id));
      setAviso({ type: 'success', text: 'Usuario eliminado.' });
    } catch (e) {
      setAviso({ type: 'error', text: e.message });
    } finally {
      setBusyId(null);
      setConfirmar(null);
    }
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Panel de administración"
        icon="shield"
        title="Gestión de"
        accent="usuarios"
        lead={`Sesión de ${name || 'administrador'}. Cambia roles o elimina cuentas registradas en la base de datos.`}
      >
        <button type="button" className="btn btn-secondary btn-sm" onClick={cargar} disabled={loading}>
          <Icon name="refresh" size={16} />
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
        <Link className="btn btn-ghost btn-sm" to="/admin/config">
          <Icon name="settings" size={16} />
          Admin Config
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
      </section>

      {aviso && (
        <div className={`alert ${aviso.type === 'success' ? 'alert--info' : 'alert--error'} mb-2`}>
          <Icon name={aviso.type === 'success' ? 'check' : 'alert'} size={18} />
          <span>{aviso.text}</span>
        </div>
      )}

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
        <div className="section-heading">
          <h2>Cuentas registradas</h2>
          <p>Los cambios de rol se aplican de inmediato en la base de datos.</p>
        </div>

        {loading ? (
          <div className="panel stack">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton" style={{ width: `${88 - i * 9}%` }} />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <span className="card-icon">
              <Icon name="users" size={20} />
            </span>
            <h3>No hay usuarios registrados</h3>
            <p>Cuando alguien cree una cuenta aparecerá en esta lista.</p>
            <Link className="btn btn-primary btn-sm" to="/register">
              <Icon name="userPlus" size={16} />
              Crear el primero
            </Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th>Registrado</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const id = userId(u);
                  const rol = String(u.rol || '').toLowerCase();
                  const ocupado = busyId === id;

                  return (
                    <tr key={id}>
                      <td>
                        <span className="cell-user">
                          <span className="avatar">
                            {String(u.user || '?').slice(0, 2).toUpperCase()}
                          </span>
                          <span>
                            {u.user}
                            <span className="cell-mono" style={{ display: 'block' }}>
                              {id}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td>
                        <span className={roleClass(u.rol)}>{u.rol || 'user'}</span>
                      </td>
                      <td>{formatDate(u.createdAt)}</td>
                      <td>
                        <div className="cell-actions">
                          {rol !== 'root' && (
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              disabled={ocupado}
                              onClick={() => cambiarRol(id, 'root')}
                            >
                              <Icon name="arrowUp" size={15} />
                              Promover
                            </button>
                          )}

                          {rol !== 'user' && (
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              disabled={ocupado}
                              onClick={() => cambiarRol(id, 'user')}
                            >
                              Degradar
                            </button>
                          )}

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            disabled={ocupado}
                            onClick={() => setConfirmar(u)}
                          >
                            <Icon name="trash" size={15} />
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {confirmar && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card modal-card--error">
            <div className="modal-icon">!</div>
            <h3>Eliminar usuario</h3>
            <p>
              ¿Seguro que quieres eliminar la cuenta <strong>{confirmar.user}</strong>? Esta acción
              no se puede deshacer.
            </p>
            <div className="row" style={{ justifyContent: 'center' }}>
              <button type="button" onClick={() => eliminar(userId(confirmar))}>
                Sí, eliminar
              </button>
              <button
                type="button"
                style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,.4)' }}
                onClick={() => setConfirmar(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Admin;
