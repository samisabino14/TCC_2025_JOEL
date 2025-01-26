export default function returnRole(role: number) {
    if (role === 1) return 'gestor';
    if (role === 2) return 'administrador';
    if (role === 3) return 'empresa';
    if (role === 4) return 'utilizador';
    return null;
};