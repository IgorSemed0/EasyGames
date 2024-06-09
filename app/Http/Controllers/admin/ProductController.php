<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return view('products.index', compact('products'));
    }

    public function create()
    {
        return view('products.create');
    }

    public function store(Request $request)
    {
        // Valida os dados da requisição
        $request->validate([
            'name' => 'required|string|max:255|unique:products',
            'price' => 'required|numeric|min:0',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Cria um novo produto com os dados validados
        Product::create($request->all());

        // Redireciona para a lista de produtos com uma mensagem de sucesso
        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }

    public function edit(Product $product)
    {
        return view('products.edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        // Valida os dados da requisição
        $request->validate([
            'name' => 'required|string|max:255|unique:products,name,' . $product->id,
            'price' => 'required|numeric|min:0',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Atualiza os dados do produto
        $product->update($request->all());

        // Redireciona para a lista de produtos com uma mensagem de sucesso
        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
