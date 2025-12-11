from rest_framework.views import exception_handler
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if isinstance(exc, ValidationError) and response is not None:
        custom_errors = []

        # 1. CASO DJOSER (Lista)
        if isinstance(response.data, list):
            for message in response.data:
                custom_errors.append(f"{message}")

        # 2. CASO PADRÃO (Dicionário)
        elif isinstance(response.data, dict):
            for field, messages in response.data.items():
                if isinstance(messages, list):
                    for message in messages:
                        if field == "non_field_errors":
                            custom_errors.append(f"{message}")
                        else:
                            custom_errors.append(f"{message}") 
                else:
                    custom_errors.append(f"{field.capitalize()}: {messages}")

        return Response(
            {
                "detail": "Erro de validação",
                "errors": custom_errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    return response