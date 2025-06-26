export default function returnRole(role: string) {
    if (role === "gestor") return 'gestor';
    if (role === "admin" || role === "Administrador") return 'administrador';
    if (role === "usuario") return 'utilizador';
    return null;
};