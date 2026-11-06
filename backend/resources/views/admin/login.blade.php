<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Connexion Admin - WinaFakhar</title>
    <link rel="stylesheet" href="{{ asset('css/admin-login.css') }}">
</head>
<body>
    <main class="login-container">
        <section class="login-card">
            <h2>Connexion Admin</h2>
            @if ($errors->any())
                <p role="alert">{{ $errors->first() }}</p>
            @endif
            <form method="POST" action="{{ route('admin.login.submit') }}">
                @csrf
                <input type="email" name="email" placeholder="Email" value="{{ old('email') }}" required autofocus>
                <input type="password" name="password" placeholder="Mot de passe" required>
                <button type="submit">Se connecter</button>
            </form>
            <p>WinaFakhar Pottery Admin Panel</p>
        </section>
    </main>
</body>
</html>
