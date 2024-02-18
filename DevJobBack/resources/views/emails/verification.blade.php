<!-- resources/views/emails/verification.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body>
    <h1>Email Verification</h1>
    <p>
        Hola {{ $user->name }},
    </p>
    <p>
        Por favor, verifica tu dirección de correo electrónico haciendo clic en el siguiente enlace:
        <a href="{{ $verificationUrl }}">hola</a>
    </p>
</body>
</html>

