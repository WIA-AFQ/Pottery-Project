@extends('layouts.app')
@section('content')

<form
method="POST"
action="{{ route('products.store') }}"
enctype="multipart/form-data">

@csrf

<input
type="text"
name="name"
placeholder="Nom">

<textarea
name="description">
</textarea>

<input
type="number"
step="0.01"
name="prix"
placeholder="Prix">

<input
type="number"
name="stock"
placeholder="Stock">

<input
type="file"
name="image">

<select name="category_id">

@foreach($categories as $category)

<option value="{{ $category->id }}">
    {{ $category->name }}
</option>

@endforeach

</select>

<button>
Ajouter
</button>

</form>

@endsection