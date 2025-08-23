from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from powerUp.views.ProdutoView import ProdutoViewSet
from powerUp.views.ClienteView import ClienteViewSet
from powerUp.views.LoginView import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)
router.register(r'clientes', ClienteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)