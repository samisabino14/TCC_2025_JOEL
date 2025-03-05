export default function returnRole(role: string) {
    if (role === "Gestor") return 'gestor';
    if (role === "Admin" || role === "Administrador") return 'administrador';
    if (role === "Usuário") return 'utilizador';
    return null;
};