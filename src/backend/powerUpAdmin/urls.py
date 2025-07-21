from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from powerUp.views.ProdutoView import ProdutoViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),  # isso expõe /produtos/
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
