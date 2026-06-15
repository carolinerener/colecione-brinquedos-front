'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ItemCarrinho {
  id: number;
  name: string;
  price: number;
  quantidade: number;
  imagem?: string;
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  adicionarItem: (item: Omit<ItemCarrinho, 'quantidade'>) => void;
  removerItem: (id: number) => void;
  aumentarQuantidade: (id: number) => void;
  diminuirQuantidade: (id: number) => void;
  limparCarrinho: () => void;
  total: number;
  quantidade: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | null>(null);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem('carrinho');
    if (salvo) {
      try { setItens(JSON.parse(salvo)); } catch {}
    }
    setCarregado(true);
  }, []);

  useEffect(() => {
    if (carregado) localStorage.setItem('carrinho', JSON.stringify(itens));
  }, [itens, carregado]);

  function adicionarItem(item: Omit<ItemCarrinho, 'quantidade'>) {
    setItens((prev) => {
      const existe = prev.find((i) => i.id === item.id);
      if (existe) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  }

  function removerItem(id: number) {
    setItens((prev) => prev.filter((i) => i.id !== id));
  }

  function aumentarQuantidade(id: number) {
    setItens((prev) => prev.map((i) => i.id === id ? { ...i, quantidade: i.quantidade + 1 } : i));
  }

  function diminuirQuantidade(id: number) {
    setItens((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i)
        .filter((i) => i.quantidade > 0)
    );
  }

  function limparCarrinho() {
    setItens([]);
  }

  const total = itens.reduce((acc, item) => acc + item.price * item.quantidade, 0);
  const quantidade = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, aumentarQuantidade, diminuirQuantidade, limparCarrinho, total, quantidade }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  return context;
}