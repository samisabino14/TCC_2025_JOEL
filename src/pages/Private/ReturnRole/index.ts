export default function returnRole(role: string) {
    if (role === "admin" || role === "Administrador") return 'administrador';
    if (role === "usuario") return 'utilizador';
    if (role === "funcionario") return 'funcionario';
    return null;
};