<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Gestion des Produits - WinaFakhar</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/admin-products.css') }}">
    <style>
        .admin-top-link { color: #8b5e3c; text-decoration: none; }
        .admin-form-box { border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; }
        .admin-form-box input, .admin-form-box textarea { display: block; width: 100%; padding: 8px; margin-bottom: 10px; }
        .admin-save { background: green; color: white; padding: 10px; border: 0; cursor: pointer; }
        .admin-actions { display: flex; gap: 10px; margin: 0 10px 10px; }
        .admin-actions button { flex: 1; border: 0; padding: 7px 10px; cursor: pointer; border-radius: 4px; }
        .admin-edit { background: #ffc107; }
        .admin-delete { background: #dc3545; color: white; }
        .admin-flash { margin: 0 0 16px; color: #2c6e39; }
        .admin-error { margin: 0 0 16px; color: #b42318; }
        .admin-product-form { display: none; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .sidebar a { color: inherit; text-decoration: none; }
    </style>
</head>
<body>
<div class="app">
    <header class="navbar">
        <div class="nav-left">
            <div class="logo-container">
                <span class="logo-small">POTERIE</span>
                <h1 class="logo">WinaFakhar - Admin</h1>
            </div>
        </div>
        <div class="nav-right">
            <form method="POST" action="{{ route('admin.logout') }}">
                @csrf
                <button class="admin-top-link" type="submit" style="border:0;background:none;cursor:pointer;">Déconnexion</button>
            </form>
        </div>
    </header>

    <div class="container">
        <aside class="sidebar">
            <ul>
                <li><a href="{{ config('app.frontend_url') }}/">Accueil</a></li>
                <li><a href="{{ config('app.frontend_url') }}/products">Produits (Client)</a></li>
                <li>Gestion Produits</li>
            </ul>
        </aside>

        <main class="content">
            <div class="products-page">
                <h1 class="products-title">Gestion des Produits</h1>

                @if (session('success')) <p class="admin-flash">{{ session('success') }}</p> @endif
                @if ($errors->any()) <p class="admin-error" role="alert">{{ $errors->first() }}</p> @endif

                <button id="toggle-product-form" class="add-btn" type="button" style="background-color:#28a745;margin-bottom:20px;">
                    + Ajouter un produit
                </button>

                <form id="product-form" class="admin-form-box admin-product-form" method="POST" action="{{ route('admin.products.store') }}">
                    @csrf
                    <h3>Ajouter un nouveau produit</h3>
                    <input type="text" name="name" placeholder="Nom du produit" value="{{ old('name') }}" required>
                    <input type="number" name="prix" placeholder="Prix" min="0" step="0.01" value="{{ old('prix') }}" required>
                    <textarea name="description" placeholder="Description">{{ old('description') }}</textarea>
                    <input type="hidden" name="stock" value="20">
                    <button class="admin-save" type="submit">Enregistrer</button>
                </form>

                <div class="products-grid">
                    @forelse ($products as $product)
                        <div class="product-card">
                            <img src="{{ $product->image_url }}" alt="{{ $product->name }}">
                            <div class="product-info">
                                <h3>{{ $product->name }}</h3>
                                <p>{{ $product->description }}</p>
                                <p class="price">{{ $product->prix }} DH</p>
                            </div>
                            <div class="admin-actions">
                                <button class="admin-edit" type="button" onclick="editProduct({{ $product->id }}, @js($product->name), @js((float) $product->prix))">Modifier</button>
                                <form method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('Voulez-vous vraiment supprimer ce produit ?')" style="flex:1;display:flex;">
                                    @csrf
                                    @method('DELETE')
                                    <button class="admin-delete" type="submit" style="width:100%;">Supprimer</button>
                                </form>
                            </div>
                            <form id="edit-product-{{ $product->id }}" method="POST" action="{{ route('admin.products.update', $product) }}" style="display:none;">
                                @csrf
                                @method('PUT')
                                <input type="hidden" name="name">
                                <input type="hidden" name="prix">
                            </form>
                        </div>
                    @empty
                        <p>Aucun produit n'est enregistré.</p>
                    @endforelse
                </div>
            </div>
        </main>
    </div>
</div>

<script>
    const toggleButton = document.getElementById('toggle-product-form');
    const productForm = document.getElementById('product-form');
    toggleButton.addEventListener('click', () => {
        const isOpen = productForm.style.display === 'block';
        productForm.style.display = isOpen ? 'none' : 'block';
        toggleButton.textContent = isOpen ? '+ Ajouter un produit' : '- Annuler';
    });

    function editProduct(id, currentName, currentPrice) {
        const name = window.prompt('Modifier le nom du produit :', currentName);
        if (name === null || !name.trim()) return;
        const price = window.prompt('Modifier le prix :', currentPrice);
        if (price === null || price.trim() === '' || !Number.isFinite(Number(price))) return;
        const form = document.getElementById(`edit-product-${id}`);
        form.elements.name.value = name.trim();
        form.elements.prix.value = price;
        form.submit();
    }
</script>
</body>
</html>
