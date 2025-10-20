from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

from powerUp.views.ProdutoView import ProdutoViewSet
from powerUp.views.ClienteView import ClienteViewSet
from powerUp.views.FavoritoView import FavoritoViewSet
from powerUp.views.PromocoesView import PromocoesViewSet
from powerUp.views.EnderecoView import EnderecoViewSet
from powerUp.views.CartaoView import CartaoViewSet
from powerUp.views.RedefinirSenhaView import RedefinirSenhaView
from powerUp.views.LoginView import CustomTokenObtainPairView
from powerUp.views.CarrinhoView import CarrinhoAPIView

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'enderecos', EnderecoViewSet, basename='endereco')
router.register(r'cartoes', CartaoViewSet, basename='cartao')
router.register(r'favoritos', FavoritoViewSet, basename='favorito')
router.register(r'promocoes', PromocoesViewSet, basename='promocoes')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('redefinir-senha/', RedefinirSenhaView.as_view(), name='redefinir-senha'),
    path('carrinho/', CarrinhoAPIView.as_view(), name='carrinho'),
    path('carrinho/item/<int:item_id>/', CarrinhoAPIView.as_view(), name='carrinho-item-delete'),
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)