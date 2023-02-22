from django.urls import path, re_path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import routers

from users.views import register_by_access_token, UserViewSet, current_user, MyTokenObtainPairView


app_name = 'users'

router = routers.DefaultRouter()
router.register('user', UserViewSet, basename='user')

urlpatterns = [
    re_path('register-by-access-token/' + r'social/(?P<backend>[^/]+)/$', register_by_access_token),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('current_user/', current_user, name='current_user'),
    path('', include(router.urls)),
]