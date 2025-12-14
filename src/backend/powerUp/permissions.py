from rest_framework import permissions

class IsPerfilAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        try:
            return request.user.cliente.perfil == 'admin'
        except AttributeError:
            return False