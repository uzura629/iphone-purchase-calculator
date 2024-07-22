const partsCosts = {
    'iPhone6s': { 'lcd': 1600, 'battery': 1500, 'batteryTag': 1700, 'faceid': 0, 'homeButton': 200 },
    'iPhone7': { 'lcd': 1900, 'battery': 1700, 'batteryTag': 1900, 'faceid': 0, 'homeButton': 200 },
    'iPhone7Plus': { 'lcd': 2200, 'battery': 1900, 'batteryTag': 2100, 'faceid': 0, 'homeButton': 200 },
    'iPhone8': { 'lcd': 2500, 'battery': 1700, 'batteryTag': 1900, 'faceid': 0, 'homeButton': 200 },
    'iPhone8Plus': { 'lcd': 2500, 'battery': 1700, 'batteryTag': 1900, 'faceid': 0, 'homeButton': 200 },
    'iPhoneX': { 'lcd': 2272, 'battery': 800, 'batteryTag': 800, 'faceid': 0, 'homeButton': 0 },
    'iPhoneXS': { 'lcd': 2411, 'battery': 800, 'batteryTag': 800, 'faceid': 0, 'homeButton': 0 },
    'iPhoneXSMax': { 'lcd': 2886, 'battery': 800, 'batteryTag': 800, 'faceid': 0, 'homeButton': 0 },
    'iPhoneXR': { 'lcd': 2430, 'battery': 800, 'batteryTag': 800, 'faceid': 0, 'homeButton': 0 },
    'iPhone11': { 'lcd': 2435, 'battery': 920, 'batteryTag': 1724, 'faceid': 0, 'homeButton': 0 },
    'iPhone11Pro': { 'lcd': 2936, 'battery': 1400, 'batteryTag': 2196, 'faceid': 0, 'homeButton': 0 },
    'iPhone11ProMax': { 'lcd': 2999, 'battery': 1480, 'batteryTag': 2276, 'faceid': 0, 'homeButton': 0 },
    'iPhone12': { 'lcd': 3112, 'battery': 950, 'batteryTag': 1786, 'faceid': 0, 'homeButton': 0 },
    'iPhone12Mini': { 'lcd': 4856, 'battery': 900, 'batteryTag': 1736, 'faceid': 0, 'homeButton': 0 },
    'iPhone12Pro': { 'lcd': 3112, 'battery': 950, 'batteryTag': 1786, 'faceid': 0, 'homeButton': 0 },
    'iPhone12ProMax': { 'lcd': 4897, 'battery': 920, 'batteryTag': 1786, 'faceid': 0, 'homeButton': 0 },
    'iPhoneSE2': { 'lcd': 2500, 'battery': 1700, 'batteryTag': 1900, 'faceid': 0, 'homeButton': 200 }
};

const recommendedPrices = {
    'iPhone6s': { '16': 4700, '32': 6000, '64': 8000, '128': 9000 },
    'iPhone7': { '32': 8000, '128': 9000, '256': 10000 },
    'iPhone7Plus': { '32': 10000, '128': 11000, '256': 12000 },
    'iPhone8': { '64': 12000, '256': 15000 },
    'iPhone8Plus': { '64': 18000, '256': 20000 },
    'iPhoneX': { '64': 20000, '256': 22000 },
    'iPhoneXS': { '64': 18000, '256': 30000, '512': 40000 },
    'iPhoneXSMax': { '64': 35000, '256': 40000, '512': 36000 },
    'iPhoneXR': { '64': 23000, '128': 30000, '256': 38000 },
    'iPhone11': { '64': 34000, '128': 40000, '256': 50000 },
    'iPhone11Pro': { '64': 38000, '256': 55000, '512': 70000 },
    'iPhone11ProMax': { '64': 40000, '256': 63000, '512': 80000 },
    'iPhone12': { '64': 45000, '128': 55000 },
    'iPhone12Mini': { '64': 38000, '128': 50000, '256': 38000 },
    'iPhone12Pro': { '128': 60000, '256': 80000, '512': 90000 },
    'iPhone12ProMax': { '128': 70000, '256': 90000 },
    'iPhoneSE2': { '64': 18000, '128': 25000, '256': 28000 }
};

function updateStorageOptions() {
    const productName = document.getElementById('productName').value;
    const storageSelect = document.getElementById('storage');
    const warningElement = document.getElementById('storageWarning');

    // 既存のオプションをクリア
    storageSelect.innerHTML = '<option value="">選択してください</option>';

    if (productName && recommendedPrices[productName]) {
        const availableStorages = Object.keys(recommendedPrices[productName]);
        
        if (availableStorages.length > 0) {
            availableStorages.forEach(storage => {
                const option = document.createElement('option');
                option.value = storage;
                option.textContent = `${storage}GB`;
                storageSelect.appendChild(option);
            });
            warningElement.style.display = 'none';
        } else {
            warningElement.textContent = 'この機種には対応する容量がありません。';
            warningElement.style.display = 'block';
        }
    } else {
        warningElement.style.display = 'none';
    }

    calculateRecommendedPurchasePrice();
}

function updatePartsCost(partNumber) {
    const productName = document.getElementById('productName').value;
    const partsName = document.getElementById(`partsName${partNumber}`).value;
    const partsCostInput = document.getElementById(`partsCost${partNumber}`);

    if (productName && partsName && partsCosts[productName] && partsCosts[productName][partsName]) {
        partsCostInput.value = partsCosts[productName][partsName];
    } else {
        partsCostInput.value = '';
    }
    calculateRecommendedPurchasePrice();
}

function calculateRecommendedPurchasePrice() {
    const productName = document.getElementById('productName').value;
    const storage = document.getElementById('storage').value;
    const partsCost1 = parseInt(document.getElementById('partsCost1').value) || 0;
    const partsCost2 = parseInt(document.getElementById('partsCost2').value) || 0;
    const partsCost3 = parseInt(document.getElementById('partsCost3').value) || 0;

    if (productName && storage && recommendedPrices[productName] && recommendedPrices[productName][storage]) {
        const recommendedPrice = recommendedPrices[productName][storage];
        const totalPartsCost = partsCost1 + partsCost2 + partsCost3;
        
        const shippingCost = 500; // 仮の送料
        const commission = Math.round(recommendedPrice * 0.1); // 10%の手数料

        // 20%の利益率を達成するための最大仕入れ値を計算
        const maxPurchasePrice = Math.floor((recommendedPrice * 0.8 - totalPartsCost - shippingCost - commission) * 0.8);

        document.getElementById('recommendedPrice').textContent = recommendedPrice;
        document.getElementById('recommendedPurchasePrice').textContent = maxPurchasePrice;
        document.getElementById('result').style.display = 'block';
    } else {
        document.getElementById('result').style.display = 'none';
    }
}

document.getElementById('productName').addEventListener('change', function() {
    updateStorageOptions();
    updatePartsCost(1);
    updatePartsCost(2);
});

document.getElementById('storage').addEventListener('change', calculateRecommendedPurchasePrice);

document.getElementById('partsName1').addEventListener('change', function() {
    updatePartsCost(1);
});

document.getElementById('partsName2').addEventListener('change', function() {
    updatePartsCost(2);
});

document.getElementById('partsCost3').addEventListener('input', calculateRecommendedPurchasePrice);