from django.apps import AppConfig


class GazmanagementConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'gazmanagement'
    
    def ready(self):
        import gazmanagement.signals