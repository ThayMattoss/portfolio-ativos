import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, History, Briefcase, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';

const PortfolioTracker = () => {
  // Função para carregar dados do localStorage
  const loadFromStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error);
      return defaultValue;
    }
  };

  // Função para salvar no localStorage
  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  };

  const [assets, setAssets] = useState(() => loadFromStorage('portfolio-assets', [
    { id: 1, type: 'Ações', ticker: 'BBAS3', name: 'Banco do Brasil ON', targetQty: 14, teacherQty: 14, currentQty: 14, myAvgPrice: 24.66, teacherPrice: 24.66, currentPrice: 21.58, status: 'complete' },
    { id: 2, type: 'Ações', ticker: 'BBSE3', name: 'BB Seguridade ON', targetQty: 11, teacherQty: 11, currentQty: 11, myAvgPrice: 34.17, teacherPrice: 34.17, currentPrice: 32.82, status: 'complete' },
    { id: 3, type: 'Ações', ticker: 'CMIG4', name: 'Cemig PN', targetQty: 14, teacherQty: 14, currentQty: 14, myAvgPrice: 10.69, teacherPrice: 10.69, currentPrice: 10.84, status: 'complete' },
    { id: 4, type: 'Ações', ticker: 'PETR4', name: 'Petrobras PN', targetQty: 3, teacherQty: 3, currentQty: 3, myAvgPrice: 31.84, teacherPrice: 31.84, currentPrice: 31.00, status: 'complete' },
    { id: 5, type: 'Ações', ticker: 'ITSA4', name: 'Itausa PN', targetQty: 5, teacherQty: 5, currentQty: 0, myAvgPrice: 0, teacherPrice: 8.89, currentPrice: 11.22, status: 'pending' },
    { id: 6, type: 'Ações', ticker: 'FIQE3', name: 'Unifique Telecom', targetQty: 12, teacherQty: 12, currentQty: 0, myAvgPrice: 0, teacherPrice: 3.45, currentPrice: 4.46, status: 'pending' },
    { id: 7, type: 'Ações', ticker: 'BRBI11', name: 'BR Partners Unit', targetQty: 3, teacherQty: 3, currentQty: 0, myAvgPrice: 0, teacherPrice: 13.30, currentPrice: 17.93, status: 'pending' },
    { id: 8, type: 'FIIs', ticker: 'RZTR11', name: 'Riza Terrax', targetQty: 7, teacherQty: 7, currentQty: 0, myAvgPrice: 0, teacherPrice: 93.17, currentPrice: 91.33, status: 'pending' },
    { id: 9, type: 'FIIs', ticker: 'GGRC11', name: 'GGR Covepi Renda', targetQty: 59, teacherQty: 59, currentQty: 0, myAvgPrice: 0, teacherPrice: 9.75, currentPrice: 9.99, status: 'pending' },
    { id: 10, type: 'FIIs', ticker: 'XPLG11', name: 'XP Logística', targetQty: 5, teacherQty: 5, currentQty: 5, myAvgPrice: 103.18, teacherPrice: 103.18, currentPrice: 100.33, status: 'complete' },
    { id: 11, type: 'FIIs', ticker: 'GARE11', name: 'Gávea Renda Imobiliário', targetQty: 43, teacherQty: 43, currentQty: 0, myAvgPrice: 0, teacherPrice: 8.66, currentPrice: 8.95, status: 'pending' },
    { id: 12, type: 'FIIs', ticker: 'MXRF11', name: 'Maxi Renda', targetQty: 38, teacherQty: 38, currentQty: 0, myAvgPrice: 0, teacherPrice: 9.67, currentPrice: 9.68, status: 'pending' },
    { id: 13, type: 'FIIs', ticker: 'KNCR11', name: 'Kinea Renda Imobiliária', targetQty: 3, teacherQty: 3, currentQty: 0, myAvgPrice: 0, teacherPrice: 98.07, currentPrice: 104.15, status: 'pending' },
    { id: 14, type: 'FIIs', ticker: 'BTLG11', name: 'BTG Logística', targetQty: 3, teacherQty: 3, currentQty: 0, myAvgPrice: 0, teacherPrice: 94.03, currentPrice: 104.14, status: 'pending' },
    { id: 15, type: 'FIIs', ticker: 'HSLG11', name: 'HSI Logística', targetQty: 3, teacherQty: 3, currentQty: 3, myAvgPrice: 87.57, teacherPrice: 87.57, currentPrice: 87.50, status: 'complete' },
    { id: 16, type: 'FIIs', ticker: 'PORD11', name: 'Porto Seguro Renda', targetQty: 46, teacherQty: 46, currentQty: 0, myAvgPrice: 0, teacherPrice: 8.13, currentPrice: 7.98, status: 'pending' },
    { id: 17, type: 'FIIs', ticker: 'CPTS11', name: 'Capitânia Renda Imobiliária', targetQty: 18, teacherQty: 18, currentQty: 0, myAvgPrice: 0, teacherPrice: 7.99, currentPrice: 7.69, status: 'pending' },
    { id: 18, type: 'FIIs', ticker: 'NEWL11', name: 'Newland Renda', targetQty: 1, teacherQty: 1, currentQty: 1, myAvgPrice: 117.56, teacherPrice: 117.56, currentPrice: 103.50, status: 'complete' },
    { id: 19, type: 'FIIs', ticker: 'HSML11', name: 'HSI Malls', targetQty: 1, teacherQty: 1, currentQty: 1, myAvgPrice: 87.3, teacherPrice: 87.3, currentPrice: 83.45, status: 'complete' },
  ]));

  const [transactions, setTransactions] = useState(() => loadFromStorage('portfolio-transactions', []));
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showEditTransactionModal, setShowEditTransactionModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [purchaseQty, setPurchaseQty] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [purchaseType, setPurchaseType] = useState('minha'); // 'minha' ou 'professor'
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' ou 'history'
  const [newAsset, setNewAsset] = useState({
    type: 'Ações',
    ticker: '',
    name: '',
    targetQty: '',
    teacherPrice: '',
    currentPrice: ''
  });
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [updatingPrices, setUpdatingPrices] = useState(false);
  const [showEditCurrentPriceModal, setShowEditCurrentPriceModal] = useState(false);
  const [editCurrentPrice, setEditCurrentPrice] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // useEffect para salvar automaticamente no localStorage
  useEffect(() => {
    saveToStorage('portfolio-assets', assets);
  }, [assets]);

  useEffect(() => {
    saveToStorage('portfolio-transactions', transactions);
  }, [transactions]);

  // Base de dados local com principais ativos brasileiros
  const stockDatabase = {
    'PETR3': { name: 'Petróleo Brasileiro S.A. - Petrobras ON', price: 31.00 },
    'PETR4': { name: 'Petróleo Brasileiro S.A. - Petrobras PN', price: 31.00 },
    'VALE3': { name: 'Vale S.A. ON', price: 60.50 },
    'ITUB4': { name: 'Itaú Unibanco Holding S.A. PN', price: 32.50 },
    'BBDC4': { name: 'Banco Bradesco S.A. PN', price: 15.20 },
    'ABEV3': { name: 'Ambev S.A. ON', price: 12.80 },
    'WEGE3': { name: 'WEG S.A. ON', price: 45.30 },
    'RENT3': { name: 'Localiza Rent a Car S.A. ON', price: 52.40 },
    'LREN3': { name: 'Lojas Renner S.A. ON', price: 18.90 },
    'MGLU3': { name: 'Magazine Luiza S.A. ON', price: 8.50 },
    'JBSS3': { name: 'JBS S.A. ON', price: 28.70 },
    'SUZB3': { name: 'Suzano S.A. ON', price: 50.20 },
    'VIVT3': { name: 'Telefônica Brasil S.A. ON', price: 47.80 },
    'ELET3': { name: 'Centrais Elétricas Brasileiras S.A. - Eletrobras ON', price: 42.10 },
    'BBAS3': { name: 'Banco do Brasil S.A. ON', price: 21.58 },
    'SANB11': { name: 'Banco Santander (Brasil) S.A. UNT', price: 35.40 },
    'CIEL3': { name: 'Cielo S.A. ON', price: 5.80 },
    'HAPV3': { name: 'Hapvida Participações e Investimentos S.A. ON', price: 9.20 },
    'RADL3': { name: 'Raia Drogasil S.A. ON', price: 25.60 },
    'PRIO3': { name: 'PetroRio S.A. ON', price: 38.90 }
  };

  const fetchStockPrice = async (ticker) => {
    if (!ticker || ticker.length < 4) return;
    setLoadingPrice(true);
    
    try {
      // Tentar múltiplas APIs em sequência
      
      // 1. Tentar Brapi sem token (às vezes funciona)
      try {
        const response = await fetch(`https://brapi.dev/api/quote/${ticker}`);
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const stock = data.results[0];
            const stockName = stock.longName || stock.shortName || `${ticker}`;
            const stockPrice = stock.regularMarketPrice || 0;
            
            setNewAsset(prev => ({
              ...prev,
              currentPrice: stockPrice.toFixed(2),
              name: stockName
            }));
            
            alert(`✅ Preço obtido da API Brapi: ${stockName} - R$ ${stockPrice.toFixed(2)}`);
            setLoadingPrice(false);
            return;
          }
        }
      } catch (e) {
        console.log('Brapi sem token falhou:', e);
      }
      
      // 2. Tentar Brapi com token demo
      try {
        const response = await fetch(`https://brapi.dev/api/quote/${ticker}?token=jm8UNs1DzLVvALQwRicdFD`);
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const stock = data.results[0];
            const stockName = stock.longName || stock.shortName || `${ticker}`;
            const stockPrice = stock.regularMarketPrice || 0;
            
            setNewAsset(prev => ({
              ...prev,
              currentPrice: stockPrice.toFixed(2),
              name: stockName
            }));
            
            alert(`✅ Preço obtido da API Brapi: ${stockName} - R$ ${stockPrice.toFixed(2)}`);
            setLoadingPrice(false);
            return;
          }
        }
      } catch (e) {
        console.log('Brapi com token falhou:', e);
      }
      
      // 3. Tentar API alternativa (Yahoo Finance via proxy)
      try {
        const yahooTicker = ticker.includes('.') ? ticker : `${ticker}.SA`;
        const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${yahooTicker}`);
        if (response.ok) {
          const data = await response.json();
          if (data.chart && data.chart.result && data.chart.result.length > 0) {
            const result = data.chart.result[0];
            const price = result.meta.regularMarketPrice || result.meta.previousClose;
            const name = result.meta.longName || result.meta.shortName || ticker;
            
            if (price) {
              setNewAsset(prev => ({
                ...prev,
                currentPrice: price.toFixed(2),
                name: name
              }));
              
              alert(`✅ Preço obtido do Yahoo Finance: ${name} - R$ ${price.toFixed(2)}`);
              setLoadingPrice(false);
              return;
            }
          }
        }
      } catch (e) {
        console.log('Yahoo Finance falhou:', e);
      }
      
      // 4. Fallback para base local
      const upperTicker = ticker.toUpperCase();
      if (stockDatabase[upperTicker]) {
        const stock = stockDatabase[upperTicker];
        setNewAsset(prev => ({
          ...prev,
          currentPrice: stock.price.toFixed(2),
          name: stock.name
        }));
        
        alert(`⚠️ ATENÇÃO: Preço não obtido automaticamente!\n\n📊 Usando preço de referência: ${stock.name} - R$ ${stock.price.toFixed(2)}\n\n🔧 IMPORTANTE: Ajuste o campo "Cotação Atual" com o preço real de mercado antes de adicionar o ativo.`);
      } else {
        // Último recurso: preenchimento manual
        alert(`❌ Ativo ${ticker} não encontrado em nenhuma API.\n\n🔧 IMPORTANTE: Digite o nome completo e ajuste o preço com a cotação atual de mercado.\n\nTickers suportados na base local: PETR3, PETR4, VALE3, ITUB4, BBDC4, ABEV3, WEGE3, RENT3, LREN3, MGLU3, JBSS3, SUZB3, VIVT3, ELET3, BBAS3, SANB11, CIEL3, HAPV3, RADL3, PRIO3`);
        setNewAsset(prev => ({
          ...prev,
          name: prev.name || `${ticker} - Digite o nome`,
          currentPrice: prev.currentPrice || '0.00'
        }));
      }
    } catch (error) {
      console.error('Erro geral ao buscar cotação:', error);
      
      // Fallback final para base local
      const upperTicker = ticker.toUpperCase();
      if (stockDatabase[upperTicker]) {
        const stock = stockDatabase[upperTicker];
        setNewAsset(prev => ({
          ...prev,
          currentPrice: stock.price.toFixed(2),
          name: stock.name
        }));
        
        alert(`� Erro de conexão. Usando base local: ${stock.name} - R$ ${stock.price.toFixed(2)}`);
      } else {
        alert(`❌ Erro de conexão e ativo não encontrado na base local.`);
        setNewAsset(prev => ({
          ...prev,
          name: prev.name || `${ticker} - Digite o nome`,
          currentPrice: prev.currentPrice || '0.00'
        }));
      }
    } finally {
      setLoadingPrice(false);
    }
  };

  // Função para verificar se o mercado está aberto
  const isMarketOpen = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = domingo, 1 = segunda, ..., 6 = sábado
    const hour = now.getHours();
    
    // Mercado fechado: fins de semana
    if (day === 0 || day === 6) return false;
    
    // Mercado fechado: fora do horário (10h às 17h)
    if (hour < 10 || hour >= 17) return false;
    
    return true;
  };

  const updateAllPrices = async () => {
    setUpdatingPrices(true);
    
    try {
      const marketClosed = !isMarketOpen();

      if (marketClosed) {
        // Mercado fechado - manter preços atuais sem alteração
        setTimeout(() => {
          alert('Mercado fechado. Mantendo últimos preços de fechamento.');
          setUpdatingPrices(false);
        }, 500); // Pequeno delay para mostrar o loading
        return;
      }

      // Mercado aberto - tentar buscar preços reais
      const updatedAssets = [...assets];
      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < assets.length; i++) {
        try {
          const response = await fetch(`https://brapi.dev/api/quote/${assets[i].ticker}?token=jm8UNs1DzLVvALQwRicdFD`);
          
          if (response.status === 401 || response.status === 403) {
            // API não autorizada - manter preço atual
            errorCount++;
            continue;
          }
          
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const stock = data.results[0];
            updatedAssets[i] = {
              ...updatedAssets[i],
              currentPrice: stock.regularMarketPrice
            };
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          console.error(`Erro ao atualizar ${assets[i].ticker}:`, error);
          errorCount++;
        }
        
        // Delay para evitar rate limiting
        if (i < assets.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      if (successCount > 0) {
        setAssets(updatedAssets);
        alert(`Cotações atualizadas! ${successCount} ativos atualizados${errorCount > 0 ? `, ${errorCount} mantiveram preço anterior` : ''}.`);
      } else {
        alert('API indisponível. Mantendo últimos preços de fechamento.');
      }
    } catch (error) {
      console.error('Erro geral ao atualizar cotações:', error);
      alert('Erro ao atualizar cotações. Mantendo preços atuais.');
    } finally {
      setUpdatingPrices(false);
    }
  };

  const handlePurchase = () => {
    if (!selectedAsset || !purchaseQty || !purchasePrice) return;
    const qty = parseInt(purchaseQty);
    const price = parseFloat(purchasePrice);
    
    // Criar registro da transação
    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleString('pt-BR'),
      assetId: selectedAsset.id,
      ticker: selectedAsset.ticker,
      name: selectedAsset.name,
      type: purchaseType,
      quantity: qty,
      price: price,
      total: qty * price
    };
    
    // Adicionar ao histórico
    setTransactions(prev => [newTransaction, ...prev]);
    
    setAssets(assets.map(asset => {
      if (asset.id === selectedAsset.id) {
        if (purchaseType === 'professor') {
          // Compra do professor - recalcula preço médio e aumenta quantidade na meta
          const currentTeacherQty = asset.teacherQty || asset.targetQty;
          const newTeacherQty = currentTeacherQty + qty;
          const newTeacherAvgPrice = ((asset.teacherPrice * currentTeacherQty) + (price * qty)) / newTeacherQty;
          return { 
            ...asset, 
            teacherQty: newTeacherQty,
            teacherPrice: newTeacherAvgPrice,
            targetQty: asset.targetQty + qty
          };
        } else {
          // Compra minha - funcionalidade original
          const newQty = asset.currentQty + qty;
          const newMyAvgPrice = asset.currentQty > 0 ? ((asset.myAvgPrice * asset.currentQty) + (price * qty)) / newQty : price;
          return { 
            ...asset, 
            currentQty: newQty, 
            myAvgPrice: newMyAvgPrice, 
            status: newQty >= asset.targetQty ? 'complete' : 'pending' 
          };
        }
      }
      return asset;
    }));
    
    setShowModal(false);
    setSelectedAsset(null);
    setPurchaseQty('');
    setPurchasePrice('');
    setPurchaseType('minha');
  };

  const openPurchaseModal = (asset) => {
    setSelectedAsset(asset);
    setPurchasePrice(asset.currentPrice.toString());
    setPurchaseType('minha');
    setShowModal(true);
  };

  const openEditModal = (asset) => {
    setSelectedAsset(asset);
    setEditPrice(asset.myAvgPrice > 0 ? asset.myAvgPrice.toString() : '');
    setShowEditModal(true);
  };

  const handleEditPrice = () => {
    if (!selectedAsset || !editPrice) return;
    const price = parseFloat(editPrice);
    setAssets(assets.map(asset => asset.id === selectedAsset.id ? { ...asset, myAvgPrice: price } : asset));
    setShowEditModal(false);
    setSelectedAsset(null);
    setEditPrice('');
  };

  const openAddModal = () => {
    setNewAsset({ type: 'Ações', ticker: '', name: '', targetQty: '', teacherPrice: '', currentPrice: '' });
    setShowAddModal(true);
  };

  const handleAddAsset = () => {
    if (!newAsset.ticker || !newAsset.name || !newAsset.targetQty || !newAsset.teacherPrice || !newAsset.currentPrice) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    const newId = Math.max(...assets.map(a => a.id)) + 1;
    const asset = {
      id: newId,
      type: newAsset.type,
      ticker: newAsset.ticker.toUpperCase(),
      name: newAsset.name,
      targetQty: parseInt(newAsset.targetQty),
      teacherQty: parseInt(newAsset.targetQty),
      currentQty: 0, // Sempre começa em 0, será preenchido quando comprar
      myAvgPrice: 0, // Sempre começa em 0, será calculado quando comprar
      teacherPrice: parseFloat(newAsset.teacherPrice),
      currentPrice: parseFloat(newAsset.currentPrice),
      status: 'pending' // Sempre pendente no início, já que currentQty = 0
    };
    setAssets([...assets, asset]);
    setShowAddModal(false);
  };

  const handleEditCurrentPrice = () => {
    if (!editCurrentPrice || editCurrentPrice <= 0) {
      alert('Digite um preço válido!');
      return;
    }
    
    setAssets(assets.map(asset => 
      asset.id === selectedAsset.id 
        ? { ...asset, currentPrice: parseFloat(editCurrentPrice) }
        : asset
    ));
    
    setShowEditCurrentPriceModal(false);
    setEditCurrentPrice('');
    setSelectedAsset(null);
    alert('Preço atual atualizado com sucesso!');
  };

  const openEditCurrentPrice = (asset) => {
    setSelectedAsset(asset);
    setEditCurrentPrice(asset.currentPrice.toString());
    setShowEditCurrentPriceModal(true);
  };

  const deleteTransaction = (transactionId) => {
    const transaction = transactions.find(t => t.id === transactionId);
    if (!transaction) return;

    if (!window.confirm('Tem certeza que deseja deletar esta transação? Isso reverterá os valores no portfolio.')) return;

    // Reverter os efeitos da transação no asset
    setAssets(assets.map(asset => {
      if (asset.id === transaction.assetId) {
        if (transaction.type === 'professor') {
          // Reverter compra do professor
          const currentTeacherQty = asset.teacherQty;
          const newTeacherQty = currentTeacherQty - transaction.quantity;
          
          if (newTeacherQty <= 0) {
            // Se não sobrar nenhuma quantidade do professor, voltar aos valores originais
            return { 
              ...asset, 
              teacherQty: asset.targetQty - transaction.quantity,
              teacherPrice: asset.teacherPrice, // Manter o preço original
              targetQty: asset.targetQty - transaction.quantity
            };
          } else {
            // Recalcular preço médio sem esta transação
            const totalValueBefore = asset.teacherPrice * currentTeacherQty;
            const transactionValue = transaction.quantity * transaction.price;
            const newTeacherAvgPrice = (totalValueBefore - transactionValue) / newTeacherQty;
            
            return { 
              ...asset, 
              teacherQty: newTeacherQty,
              teacherPrice: newTeacherAvgPrice,
              targetQty: asset.targetQty - transaction.quantity
            };
          }
        } else {
          // Reverter compra minha
          const newQty = asset.currentQty - transaction.quantity;
          
          if (newQty <= 0) {
            return { 
              ...asset, 
              currentQty: 0, 
              myAvgPrice: 0,
              status: 'pending'
            };
          } else {
            // Recalcular preço médio sem esta transação
            const totalValueBefore = asset.myAvgPrice * asset.currentQty;
            const transactionValue = transaction.quantity * transaction.price;
            const newMyAvgPrice = (totalValueBefore - transactionValue) / newQty;
            
            return { 
              ...asset, 
              currentQty: newQty, 
              myAvgPrice: newMyAvgPrice,
              status: newQty >= asset.targetQty ? 'complete' : 'pending'
            };
          }
        }
      }
      return asset;
    }));

    // Remover transação do histórico
    setTransactions(transactions.filter(t => t.id !== transactionId));
  };

  const editTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setPurchaseQty(transaction.quantity.toString());
    setPurchasePrice(transaction.price.toString());
    setPurchaseType(transaction.type);
    setShowEditTransactionModal(true);
  };

  const handleEditTransaction = () => {
    if (!selectedTransaction || !purchaseQty || !purchasePrice) return;
    
    const newQty = parseInt(purchaseQty);
    const newPrice = parseFloat(purchasePrice);
    
    // Primeiro, reverter a transação original
    deleteTransaction(selectedTransaction.id);
    
    // Depois, aplicar a nova transação
    const updatedTransaction = {
      ...selectedTransaction,
      quantity: newQty,
      price: newPrice,
      total: newQty * newPrice,
      date: new Date().toLocaleString('pt-BR') + ' (editado)'
    };
    
    // Adicionar transação editada ao histórico
    setTransactions(prev => [updatedTransaction, ...prev]);
    
    // Aplicar efeitos da transação editada
    const asset = assets.find(a => a.id === selectedTransaction.assetId);
    if (asset) {
      setAssets(assets.map(a => {
        if (a.id === selectedTransaction.assetId) {
          if (purchaseType === 'professor') {
            const currentTeacherQty = a.teacherQty || a.targetQty;
            const newTeacherQty = currentTeacherQty + newQty;
            const newTeacherAvgPrice = ((a.teacherPrice * currentTeacherQty) + (newPrice * newQty)) / newTeacherQty;
            return { 
              ...a, 
              teacherQty: newTeacherQty,
              teacherPrice: newTeacherAvgPrice,
              targetQty: a.targetQty + newQty
            };
          } else {
            const newCurrentQty = a.currentQty + newQty;
            const newMyAvgPrice = a.currentQty > 0 ? ((a.myAvgPrice * a.currentQty) + (newPrice * newQty)) / newCurrentQty : newPrice;
            return { 
              ...a, 
              currentQty: newCurrentQty, 
              myAvgPrice: newMyAvgPrice, 
              status: newCurrentQty >= a.targetQty ? 'complete' : 'pending' 
            };
          }
        }
        return a;
      }));
    }
    
    setShowEditTransactionModal(false);
    setSelectedTransaction(null);
    setPurchaseQty('');
    setPurchasePrice('');
    setPurchaseType('minha');
  };

  const myTotalInvested = assets.reduce((sum, a) => sum + (a.currentQty * a.myAvgPrice), 0);
  const myCurrentValue = assets.reduce((sum, a) => sum + (a.currentQty * a.currentPrice), 0);
  const myProfit = myCurrentValue - myTotalInvested;
  const myProfitPercent = myTotalInvested > 0 ? ((myProfit / myTotalInvested) * 100) : 0;

  // Agora calcula baseado no preço do professor para todas as posições, mesmo as que você não comprou
  const teacherTotalInvested = assets.reduce((sum, a) => sum + (a.targetQty * a.teacherPrice), 0);
  const teacherCurrentValue = assets.reduce((sum, a) => sum + (a.targetQty * a.currentPrice), 0);
  const teacherProfit = teacherCurrentValue - teacherTotalInvested;
  const teacherProfitPercent = teacherTotalInvested > 0 ? ((teacherProfit / teacherTotalInvested) * 100) : 0;

  // Função para ordenar ativos
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Função para ordenar os dados
  const getSortedAssets = (assetsToSort) => {
    if (!sortConfig.key) return assetsToSort;

    return [...assetsToSort].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Tratamento especial para diferentes tipos de ordenação
      if (sortConfig.key === 'ticker' || sortConfig.key === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      } else if (sortConfig.key === 'myProfitLoss') {
        aValue = a.myAvgPrice > 0 ? ((a.currentPrice - a.myAvgPrice) / a.myAvgPrice) * 100 : -999;
        bValue = b.myAvgPrice > 0 ? ((b.currentPrice - b.myAvgPrice) / b.myAvgPrice) * 100 : -999;
      } else if (sortConfig.key === 'teacherProfitLoss') {
        aValue = a.teacherPrice > 0 ? ((a.currentPrice - a.teacherPrice) / a.teacherPrice) * 100 : -999;
        bValue = b.teacherPrice > 0 ? ((b.currentPrice - b.teacherPrice) / b.teacherPrice) * 100 : -999;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Componente para cabeçalho ordenável
  const SortableHeader = ({ column, children, className = "" }) => (
    <th 
      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${className}`}
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortConfig.key === column && (
          sortConfig.direction === 'asc' ? 
            <ChevronUp size={14} className="text-blue-600" /> : 
            <ChevronDown size={14} className="text-blue-600" />
        )}
      </div>
    </th>
  );

  const acoes = getSortedAssets(assets.filter(a => a.type === 'Ações'));
  const fiis = getSortedAssets(assets.filter(a => a.type === 'FIIs'));

  const AssetRow = ({ asset }) => {
    const remaining = asset.targetQty - asset.currentQty;
    const progress = (asset.currentQty / asset.targetQty) * 100;
    // Agora sempre usa o preço do professor como base para calcular a valorização do professor
    const profitLoss = asset.teacherPrice > 0 ? ((asset.currentPrice - asset.teacherPrice) / asset.teacherPrice) * 100 : 0;
    // Calcula o lucro baseado no preço do usuário
    const myProfitLoss = asset.myAvgPrice > 0 ? ((asset.currentPrice - asset.myAvgPrice) / asset.myAvgPrice) * 100 : 0;

    return (
      <tr className={asset.status === 'complete' ? 'bg-green-50' : 'bg-white'}>
        <td className="px-4 py-3 text-sm font-medium text-gray-900">{asset.ticker}</td>
        <td className="px-4 py-3 text-sm text-gray-700">{asset.name}</td>
        <td className="px-4 py-3 text-sm text-center font-semibold">{asset.currentQty}</td>
        <td className="px-4 py-3 text-sm text-center text-gray-600">{asset.targetQty}</td>
        <td className="px-4 py-3 text-sm text-center">
          <span className={remaining > 0 ? 'text-orange-600 font-semibold' : 'text-green-600 font-semibold'}>{remaining}</span>
        </td>
        <td className="px-4 py-3 text-sm text-right">
          <div className="flex items-center justify-end gap-2">
            R$ {asset.currentPrice.toFixed(2)}
            <button onClick={() => openEditCurrentPrice(asset)} className="text-green-600 hover:text-green-800" title="Editar cotação atual">
              <Edit2 size={14} />
            </button>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-right">{asset.teacherPrice > 0 ? `R$ ${asset.teacherPrice.toFixed(2)}` : '-'}</td>
        <td className="px-4 py-3 text-sm text-right">
          <div className="flex items-center justify-end gap-2">
            {asset.myAvgPrice > 0 ? `R$ ${asset.myAvgPrice.toFixed(2)}` : '-'}
            <button onClick={() => openEditModal(asset)} className="text-blue-600 hover:text-blue-800" title="Editar meu preço">
              <Edit2 size={14} />
            </button>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {asset.myAvgPrice > 0 && (
            <span className={myProfitLoss >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{myProfitLoss.toFixed(2)}%</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {asset.teacherPrice > 0 && (
            <span className={profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>{profitLoss.toFixed(2)}%</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-center">
          <button onClick={() => openPurchaseModal(asset)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs">
            Comprar
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Gestão de Ativos</h1>
            <p className="text-gray-600">Controle suas metas de investimento</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('portfolio')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'portfolio' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Briefcase size={18} />
                Portfolio
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'history' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <History size={18} />
                Histórico ({transactions.length})
              </button>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={updateAllPrices} 
                disabled={updatingPrices}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 flex items-center gap-2 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <RefreshCw size={20} className={updatingPrices ? 'animate-spin' : ''} />
                {updatingPrices ? 'Atualizando...' : 'Atualizar Cotações'}
              </button>
              <button onClick={openAddModal} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold">
                <PlusCircle size={20} />
                Adicionar Ativo
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'portfolio' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border-2 border-blue-300">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">💼 Meu Desempenho</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-700 text-xs font-semibold uppercase mb-1">Valor Investido</p>
                    <p className="text-xl font-bold text-blue-900">R$ {myTotalInvested.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 text-xs font-semibold uppercase mb-1">Valor Atual</p>
                    <p className="text-xl font-bold text-blue-900">R$ {myCurrentValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 text-xs font-semibold uppercase mb-1">Lucro/Prejuízo</p>
                    <p className={`text-xl font-bold ${myProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>R$ {myProfit.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 text-xs font-semibold uppercase mb-1">Rentabilidade</p>
                    <p className={`text-xl font-bold ${myProfitPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>{myProfitPercent.toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-lg border-2 border-purple-300">
                <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">🎓 Desempenho do Professor</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-purple-700 text-xs font-semibold uppercase mb-1">Valor Investido</p>
                    <p className="text-xl font-bold text-purple-900">R$ {teacherTotalInvested.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-purple-700 text-xs font-semibold uppercase mb-1">Valor Atual</p>
                    <p className="text-xl font-bold text-purple-900">R$ {teacherCurrentValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-purple-700 text-xs font-semibold uppercase mb-1">Lucro/Prejuízo</p>
                    <p className={`text-xl font-bold ${teacherProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>R$ {teacherProfit.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-purple-700 text-xs font-semibold uppercase mb-1">Rentabilidade</p>
                    <p className={`text-xl font-bold ${teacherProfitPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>{teacherProfitPercent.toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg shadow-lg border-2 border-yellow-300 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">⚖️ Comparação de Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-gray-700 text-sm font-semibold mb-2">Diferença de Investimento</p>
                  <p className={`text-2xl font-bold ${(myTotalInvested - teacherTotalInvested) <= 0 ? 'text-green-600' : 'text-orange-600'}`}>
                    R$ {Math.abs(myTotalInvested - teacherTotalInvested).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {myTotalInvested < teacherTotalInvested ? 'Você investiu menos' : myTotalInvested > teacherTotalInvested ? 'Você investiu mais' : 'Investimentos iguais'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 text-sm font-semibold mb-2">Diferença de Lucro</p>
                  <p className={`text-2xl font-bold ${(myProfit - teacherProfit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {(myProfit - teacherProfit).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {myProfit > teacherProfit ? '🎉 Você está ganhando mais!' : myProfit < teacherProfit ? 'Professor está ganhando mais' : 'Empate no lucro'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 text-sm font-semibold mb-2">Diferença de Rentabilidade</p>
                  <p className={`text-2xl font-bold ${(myProfitPercent - teacherProfitPercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(myProfitPercent - teacherProfitPercent).toFixed(2)}%
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {myProfitPercent > teacherProfitPercent ? '🏆 Sua rentabilidade é melhor!' : myProfitPercent < teacherProfitPercent ? 'Rentabilidade do professor é melhor' : 'Rentabilidade igual'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow mb-8">
              <div className="bg-gray-800 text-white px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-bold">Ações</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <SortableHeader column="ticker">Ticker</SortableHeader>
                      <SortableHeader column="name">Ativo</SortableHeader>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Qtd Atual</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Qtd Prof.</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Falta</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Cotação</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Preço Prof.</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Meu Preço</th>
                      <SortableHeader column="myProfitLoss" className="text-right">% Lucro</SortableHeader>
                      <SortableHeader column="teacherProfitLoss" className="text-right">% Lucro (Prof.)</SortableHeader>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Progresso</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {acoes.map(asset => <AssetRow key={asset.id} asset={asset} />)}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="bg-gray-800 text-white px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-bold">Fundos Imobiliários (FIIs)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <SortableHeader column="ticker">Ticker</SortableHeader>
                      <SortableHeader column="name">FII</SortableHeader>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Qtd Atual</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Qtd Prof.</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Falta</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Cotação</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Preço Prof.</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Meu Preço</th>
                      <SortableHeader column="myProfitLoss" className="text-right">% Lucro</SortableHeader>
                      <SortableHeader column="teacherProfitLoss" className="text-right">% Lucro (Prof.)</SortableHeader>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Progresso</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {fiis.map(asset => <AssetRow key={asset.id} asset={asset} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="bg-gray-800 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <History size={20} />
                Histórico de Transações
              </h2>
            </div>
            <div className="p-6">
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <History size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Nenhuma transação registrada ainda</p>
                  <p className="text-gray-400 text-sm">As compras que você registrar aparecerão aqui</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Data</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ativo</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Tipo</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Quantidade</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Preço Unit.</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Total</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map(transaction => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{transaction.date}</td>
                          <td className="px-4 py-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">{transaction.ticker}</span>
                              <br />
                              <span className="text-gray-500 text-xs">{transaction.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.type === 'professor' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {transaction.type === 'professor' ? 'Professor' : 'Minha'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-center font-medium">{transaction.quantity}</td>
                          <td className="px-4 py-3 text-sm text-right">R$ {transaction.price.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm text-right font-semibold">R$ {transaction.total.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => editTransaction(transaction)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Editar transação"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => deleteTransaction(transaction.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Deletar transação"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              {purchaseType === 'professor' ? 'Adicionar Compra do Professor' : 'Registrar Minha Compra'}
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>{selectedAsset.ticker}</strong> - {selectedAsset.name}</p>
              {purchaseType === 'professor' ? (
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Meta atual: <strong>{selectedAsset.targetQty}</strong> cotas</p>
                  <p>Preço médio atual do professor: <strong>R$ {selectedAsset.teacherPrice.toFixed(2)}</strong></p>
                  <p>Quantidade atual do professor: <strong>{selectedAsset.teacherQty || selectedAsset.targetQty}</strong> cotas</p>
                </div>
              ) : (
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Faltam: <strong>{selectedAsset.targetQty - selectedAsset.currentQty}</strong> cotas</p>
                  <p>Minha quantidade atual: <strong>{selectedAsset.currentQty}</strong> cotas</p>
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Compra</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="minha" 
                    checked={purchaseType === 'minha'} 
                    onChange={(e) => setPurchaseType(e.target.value)}
                    className="mr-2"
                  />
                  <span>Minha Compra</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="professor" 
                    checked={purchaseType === 'professor'} 
                    onChange={(e) => setPurchaseType(e.target.value)}
                    className="mr-2"
                  />
                  <span>Compra do Professor</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {purchaseType === 'professor' ? 
                  'Adiciona compra do professor (recalcula preço médio e aumenta meta)' : 
                  'Registra sua compra pessoal'
                }
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade {purchaseType === 'professor' ? 'adicional' : ''}
              </label>
              <input 
                type="number" 
                value={purchaseQty} 
                onChange={(e) => setPurchaseQty(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Quantidade de cotas" 
                min="1" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço {purchaseType === 'professor' ? 'que o professor' : 'que você'} pagou por cota (R$)
              </label>
              <input 
                type="number" 
                step="0.01" 
                value={purchasePrice} 
                onChange={(e) => setPurchasePrice(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Preço unitário" 
              />
            </div>
            
            {purchaseQty && purchasePrice && (
              <div className="mb-6 p-3 bg-blue-50 rounded-md space-y-2">
                <p className="text-sm text-gray-700">
                  Total da compra: <strong>R$ {(parseFloat(purchaseQty) * parseFloat(purchasePrice)).toFixed(2)}</strong>
                </p>
                {purchaseType === 'professor' && (
                  <div className="text-sm text-gray-600">
                    <p>Nova meta: <strong>{selectedAsset.targetQty + parseInt(purchaseQty)}</strong> cotas</p>
                    <p>Novo preço médio do professor: <strong>R$ {
                      (((selectedAsset.teacherPrice * (selectedAsset.teacherQty || selectedAsset.targetQty)) + 
                        (parseFloat(purchasePrice) * parseInt(purchaseQty))) / 
                        ((selectedAsset.teacherQty || selectedAsset.targetQty) + parseInt(purchaseQty))).toFixed(2)
                    }</strong></p>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex gap-3">
              <button 
                onClick={() => { 
                  setShowModal(false); 
                  setSelectedAsset(null); 
                  setPurchaseQty(''); 
                  setPurchasePrice(''); 
                  setPurchaseType('minha'); 
                }} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handlePurchase} 
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {purchaseType === 'professor' ? 'Adicionar Compra' : 'Confirmar Compra'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Editar Meu Preço Médio</h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>{selectedAsset.ticker}</strong> - {selectedAsset.name}</p>
              <p className="text-sm text-gray-600">Preço do Professor: <strong>R$ {selectedAsset.teacherPrice.toFixed(2)}</strong></p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Meu Preço Médio (R$)</label>
              <input type="number" step="0.01" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Digite seu preço médio" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowEditModal(false); setSelectedAsset(null); setEditPrice(''); }} className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
              <button onClick={handleEditPrice} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Adicionar Novo Ativo</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
                <select value={newAsset.type} onChange={(e) => setNewAsset({...newAsset, type: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Ações">Ações</option>
                  <option value="FIIs">FIIs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ticker * (ex: PETR4, MXRF11)</label>
                <div className="flex gap-2">
                  <input type="text" value={newAsset.ticker} onChange={(e) => setNewAsset({...newAsset, ticker: e.target.value.toUpperCase()})} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="PETR4" />
                  <button type="button" onClick={() => fetchStockPrice(newAsset.ticker)} disabled={loadingPrice || !newAsset.ticker} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {loadingPrice ? '...' : '🔍 Buscar'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Digite o ticker e clique em Buscar para obter a cotação atual</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Ativo *</label>
                <input type="text" value={newAsset.name} onChange={(e) => setNewAsset({...newAsset, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Petrobras PN" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade Meta *</label>
                <input type="number" value={newAsset.targetQty} onChange={(e) => setNewAsset({...newAsset, targetQty: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="10" min="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço do Professor * (R$)</label>
                <input type="number" step="0.01" value={newAsset.teacherPrice} onChange={(e) => setNewAsset({...newAsset, teacherPrice: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="25.50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cotação Atual * (R$)</label>
                <input type="number" step="0.01" value={newAsset.currentPrice} onChange={(e) => setNewAsset({...newAsset, currentPrice: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50" placeholder="24.80" readOnly={loadingPrice} />
                <p className="text-xs text-gray-500 mt-1">Preenchido automaticamente ao buscar o ticker</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
              <button onClick={handleAddAsset} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {showEditTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Editar Transação</h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>{selectedTransaction.ticker}</strong> - {selectedTransaction.name}</p>
              <p className="text-sm text-gray-600">
                Transação original: {selectedTransaction.quantity} cotas x R$ {selectedTransaction.price.toFixed(2)} 
                ({selectedTransaction.type === 'professor' ? 'Professor' : 'Minha'})
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Transação</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="minha" 
                    checked={purchaseType === 'minha'} 
                    onChange={(e) => setPurchaseType(e.target.value)}
                    className="mr-2"
                  />
                  <span>Minha Compra</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="professor" 
                    checked={purchaseType === 'professor'} 
                    onChange={(e) => setPurchaseType(e.target.value)}
                    className="mr-2"
                  />
                  <span>Compra do Professor</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
              <input 
                type="number" 
                value={purchaseQty} 
                onChange={(e) => setPurchaseQty(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Quantidade de cotas" 
                min="1" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Preço por Cota (R$)</label>
              <input 
                type="number" 
                step="0.01" 
                value={purchasePrice} 
                onChange={(e) => setPurchasePrice(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Preço unitário" 
              />
            </div>
            
            {purchaseQty && purchasePrice && (
              <div className="mb-6 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-gray-700">
                  Novo total: <strong>R$ {(parseFloat(purchaseQty) * parseFloat(purchasePrice)).toFixed(2)}</strong>
                </p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button 
                onClick={() => { 
                  setShowEditTransactionModal(false); 
                  setSelectedTransaction(null); 
                  setPurchaseQty(''); 
                  setPurchasePrice(''); 
                  setPurchaseType('minha'); 
                }} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleEditTransaction} 
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar preço atual */}
      {showEditCurrentPriceModal && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Editar Cotação Atual</h3>
            <p className="text-gray-600 mb-4">
              <strong>{selectedAsset.ticker}</strong> - {selectedAsset.name}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nova Cotação Atual (R$)</label>
              <input 
                type="number" 
                step="0.01" 
                value={editCurrentPrice} 
                onChange={(e) => setEditCurrentPrice(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                placeholder="87.50" 
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1">Preço atual: R$ {selectedAsset.currentPrice.toFixed(2)}</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowEditCurrentPriceModal(false);
                  setEditCurrentPrice('');
                  setSelectedAsset(null);
                }} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleEditCurrentPrice} 
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Atualizar Preço
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioTracker;