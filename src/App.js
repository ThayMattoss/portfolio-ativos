import React, { useState } from 'react';
import { PlusCircle, Edit2 } from 'lucide-react';

const PortfolioTracker = () => {
  const [assets, setAssets] = useState([
    { id: 1, type: 'Ações', ticker: 'BBAS3', name: 'Banco do Brasil ON', targetQty: 14, currentQty: 14, myAvgPrice: 24.66, teacherPrice: 24.66, currentPrice: 21.58, status: 'complete' },
    { id: 2, type: 'Ações', ticker: 'BBSE3', name: 'BB Seguridade ON', targetQty: 11, currentQty: 11, myAvgPrice: 34.17, teacherPrice: 34.17, currentPrice: 32.82, status: 'complete' },
    { id: 3, type: 'Ações', ticker: 'CMIG4', name: 'Cemig PN', targetQty: 14, currentQty: 14, myAvgPrice: 10.69, teacherPrice: 10.69, currentPrice: 10.84, status: 'complete' },
    { id: 4, type: 'Ações', ticker: 'PETR4', name: 'Petrobras PN', targetQty: 3, currentQty: 3, myAvgPrice: 31.84, teacherPrice: 31.84, currentPrice: 31.00, status: 'complete' },
    { id: 5, type: 'Ações', ticker: 'ITSA4', name: 'Itausa PN', targetQty: 5, currentQty: 0, myAvgPrice: 0, teacherPrice: 8.89, currentPrice: 11.22, status: 'pending' },
    { id: 6, type: 'Ações', ticker: 'FIQE3', name: 'Unifique Telecom', targetQty: 12, currentQty: 0, myAvgPrice: 0, teacherPrice: 3.45, currentPrice: 4.46, status: 'pending' },
    { id: 7, type: 'Ações', ticker: 'BRBI11', name: 'BR Partners Unit', targetQty: 3, currentQty: 0, myAvgPrice: 0, teacherPrice: 13.30, currentPrice: 17.93, status: 'pending' },
    { id: 8, type: 'FIIs', ticker: 'RZTR11', name: 'Riza Terrax', targetQty: 7, currentQty: 0, myAvgPrice: 0, teacherPrice: 93.17, currentPrice: 91.33, status: 'pending' },
    { id: 9, type: 'FIIs', ticker: 'GGRC11', name: 'GGR Covepi Renda', targetQty: 59, currentQty: 0, myAvgPrice: 0, teacherPrice: 9.75, currentPrice: 9.99, status: 'pending' },
    { id: 10, type: 'FIIs', ticker: 'XPLG11', name: 'XP Logística', targetQty: 5, currentQty: 5, myAvgPrice: 103.18, teacherPrice: 103.18, currentPrice: 100.33, status: 'complete' },
    { id: 11, type: 'FIIs', ticker: 'GARE11', name: 'Gávea Renda Imobiliário', targetQty: 43, currentQty: 0, myAvgPrice: 0, teacherPrice: 8.66, currentPrice: 8.95, status: 'pending' },
    { id: 12, type: 'FIIs', ticker: 'MXRF11', name: 'Maxi Renda', targetQty: 38, currentQty: 0, myAvgPrice: 0, teacherPrice: 9.67, currentPrice: 9.68, status: 'pending' },
    { id: 13, type: 'FIIs', ticker: 'KNCR11', name: 'Kinea Renda Imobiliária', targetQty: 3, currentQty: 0, myAvgPrice: 0, teacherPrice: 98.07, currentPrice: 104.15, status: 'pending' },
    { id: 14, type: 'FIIs', ticker: 'BTLG11', name: 'BTG Logística', targetQty: 3, currentQty: 0, myAvgPrice: 0, teacherPrice: 94.03, currentPrice: 104.14, status: 'pending' },
    { id: 15, type: 'FIIs', ticker: 'HSLG11', name: 'HSI Logística', targetQty: 3, currentQty: 3, myAvgPrice: 87.57, teacherPrice: 87.57, currentPrice: 81.50, status: 'complete' },
    { id: 16, type: 'FIIs', ticker: 'PORD11', name: 'Porto Seguro Renda', targetQty: 46, currentQty: 0, myAvgPrice: 0, teacherPrice: 8.13, currentPrice: 7.98, status: 'pending' },
    { id: 17, type: 'FIIs', ticker: 'CPTS11', name: 'Capitânia Renda Imobiliária', targetQty: 18, currentQty: 0, myAvgPrice: 0, teacherPrice: 7.99, currentPrice: 7.69, status: 'pending' },
    { id: 18, type: 'FIIs', ticker: 'NEWL11', name: 'Newland Renda', targetQty: 1, currentQty: 1, myAvgPrice: 117.56, teacherPrice: 117.56, currentPrice: 103.50, status: 'complete' },
    { id: 19, type: 'FIIs', ticker: 'HSML11', name: 'HSI Malls', targetQty: 1, currentQty: 1, myAvgPrice: 87.3, teacherPrice: 87.3, currentPrice: 83.45, status: 'complete' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [purchaseQty, setPurchaseQty] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [newAsset, setNewAsset] = useState({
    type: 'Ações',
    ticker: '',
    name: '',
    targetQty: '',
    currentQty: '0',
    myAvgPrice: '0',
    teacherPrice: '',
    currentPrice: ''
  });
  const [loadingPrice, setLoadingPrice] = useState(false);

  const fetchStockPrice = async (ticker) => {
    if (!ticker || ticker.length < 4) return;
    setLoadingPrice(true);
    try {
      const response = await fetch(`https://brapi.dev/api/quote/${ticker}?token=demo`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const stock = data.results[0];
        setNewAsset(prev => ({
          ...prev,
          currentPrice: stock.regularMarketPrice.toFixed(2),
          name: prev.name || stock.longName || stock.shortName
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar cotação:', error);
    } finally {
      setLoadingPrice(false);
    }
  };

  const handlePurchase = () => {
    if (!selectedAsset || !purchaseQty || !purchasePrice) return;
    const qty = parseInt(purchaseQty);
    const price = parseFloat(purchasePrice);
    setAssets(assets.map(asset => {
      if (asset.id === selectedAsset.id) {
        const newQty = asset.currentQty + qty;
        const newMyAvgPrice = asset.currentQty > 0 ? ((asset.myAvgPrice * asset.currentQty) + (price * qty)) / newQty : price;
        return { ...asset, currentQty: newQty, myAvgPrice: newMyAvgPrice, status: newQty >= asset.targetQty ? 'complete' : 'pending' };
      }
      return asset;
    }));
    setShowModal(false);
    setSelectedAsset(null);
    setPurchaseQty('');
    setPurchasePrice('');
  };

  const openPurchaseModal = (asset) => {
    setSelectedAsset(asset);
    setPurchasePrice(asset.currentPrice.toString());
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
    setNewAsset({ type: 'Ações', ticker: '', name: '', targetQty: '', currentQty: '0', myAvgPrice: '0', teacherPrice: '', currentPrice: '' });
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
      currentQty: parseInt(newAsset.currentQty),
      myAvgPrice: parseFloat(newAsset.myAvgPrice),
      teacherPrice: parseFloat(newAsset.teacherPrice),
      currentPrice: parseFloat(newAsset.currentPrice),
      status: parseInt(newAsset.currentQty) >= parseInt(newAsset.targetQty) ? 'complete' : 'pending'
    };
    setAssets([...assets, asset]);
    setShowAddModal(false);
  };

  const myTotalInvested = assets.reduce((sum, a) => sum + (a.currentQty * a.myAvgPrice), 0);
  const myCurrentValue = assets.reduce((sum, a) => sum + (a.currentQty * a.currentPrice), 0);
  const myProfit = myCurrentValue - myTotalInvested;
  const myProfitPercent = myTotalInvested > 0 ? ((myProfit / myTotalInvested) * 100) : 0;

  const teacherTotalInvested = assets.reduce((sum, a) => sum + (a.currentQty * a.teacherPrice), 0);
  const teacherCurrentValue = assets.reduce((sum, a) => sum + (a.currentQty * a.currentPrice), 0);
  const teacherProfit = teacherCurrentValue - teacherTotalInvested;
  const teacherProfitPercent = teacherTotalInvested > 0 ? ((teacherProfit / teacherTotalInvested) * 100) : 0;

  const acoes = assets.filter(a => a.type === 'Ações');
  const fiis = assets.filter(a => a.type === 'FIIs');

  const AssetRow = ({ asset }) => {
    const remaining = asset.targetQty - asset.currentQty;
    const progress = (asset.currentQty / asset.targetQty) * 100;
    const profitLoss = asset.currentQty > 0 && asset.myAvgPrice > 0 ? ((asset.currentPrice - asset.myAvgPrice) / asset.myAvgPrice) * 100 : 0;
    const vsTeacher = asset.myAvgPrice > 0 && asset.teacherPrice > 0 ? ((asset.myAvgPrice - asset.teacherPrice) / asset.teacherPrice) * 100 : 0;

    return (
      <tr className={asset.status === 'complete' ? 'bg-green-50' : 'bg-white'}>
        <td className="px-4 py-3 text-sm font-medium text-gray-900">{asset.ticker}</td>
        <td className="px-4 py-3 text-sm text-gray-700">{asset.name}</td>
        <td className="px-4 py-3 text-sm text-center font-semibold">{asset.currentQty}</td>
        <td className="px-4 py-3 text-sm text-center text-gray-600">{asset.targetQty}</td>
        <td className="px-4 py-3 text-sm text-center">
          <span className={remaining > 0 ? 'text-orange-600 font-semibold' : 'text-green-600 font-semibold'}>{remaining}</span>
        </td>
        <td className="px-4 py-3 text-sm text-right">R$ {asset.currentPrice.toFixed(2)}</td>
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
            <span className={vsTeacher <= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{vsTeacher.toFixed(2)}%</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {asset.currentQty > 0 && asset.myAvgPrice > 0 && (
            <span className={profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>{profitLoss.toFixed(2)}%</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-center">
          {remaining > 0 && (
            <button onClick={() => openPurchaseModal(asset)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs">Comprar</button>
          )}
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
          <button onClick={openAddModal} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold">
            <PlusCircle size={20} />
            Adicionar Ativo
          </button>
        </div>

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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ticker</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ativo</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Qtd Atual</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Meta</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Falta</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Cotação</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Preço Prof.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Meu Preço</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">% vs Prof.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">% Lucro</th>
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ticker</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">FII</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Qtd Atual</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Meta</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Falta</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Cotação</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Preço Prof.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Meu Preço</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">% vs Prof.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">% Lucro</th>
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
      </div>

      {showModal && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Registrar Compra</h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>{selectedAsset.ticker}</strong> - {selectedAsset.name}</p>
              <p className="text-sm text-gray-600">Faltam: <strong>{selectedAsset.targetQty - selectedAsset.currentQty}</strong> cotas</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
              <input type="number" value={purchaseQty} onChange={(e) => setPurchaseQty(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Quantidade de cotas" min="1" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Preço por Cota (R$)</label>
              <input type="number" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Preço unitário" />
            </div>
            {purchaseQty && purchasePrice && (
              <div className="mb-6 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-gray-700">Total da compra: <strong>R$ {(parseFloat(purchaseQty) * parseFloat(purchasePrice)).toFixed(2)}</strong></p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); setSelectedAsset(null); setPurchaseQty(''); setPurchasePrice(''); }} className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
              <button onClick={handlePurchase} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Confirmar Compra</button>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade Atual (deixe 0 se ainda não comprou)</label>
                <input type="number" value={newAsset.currentQty} onChange={(e) => setNewAsset({...newAsset, currentQty: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" min="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meu Preço Médio (deixe 0 se ainda não comprou)</label>
                <input type="number" step="0.01" value={newAsset.myAvgPrice} onChange={(e) => setNewAsset({...newAsset, myAvgPrice: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
              <button onClick={handleAddAsset} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioTracker;