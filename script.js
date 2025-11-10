/**
 * Fungsionalitas Vanilla JavaScript (Pure JS)
 * Mengambil data produk dari Fake Store API dan menampilkannya di DOM.
 */

// 1. Konstanta
const API_URL = 'https://fakestoreapi.com/products?limit=10'; // Batasi 10 produk
const container = document.getElementById('product-list-container');

// 2. Fungsi Utilitas Format Harga (Simulasi IDR)
function formatPrice(priceUSD) {
    const priceIDR = priceUSD * 15000;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(priceIDR);
}

// 3. Fungsi Pembuatan Kartu Produk (HTML String)
function createProductCardHtml(product) {
    const formattedPrice = formatPrice(product.price);
    
    // HTML Card menggunakan kelas Tailwind
    return `
        <div class="bg-white border border-gray-200 rounded overflow-hidden shadow-sm hover:shadow transition">
            
            <div class="h-28 flex items-center justify-center p-2">
                <img src="${product.image}" alt="${product.title}" class="max-h-full max-w-full object-contain">
            </div>

            <div class="p-2">
                
                <h3 class="text-xs text-gray-800 line-clamp-2 mb-1" title="${product.title}">
                    ${product.title}
                </h3>
                
                <p class="text-base font-bold text-gray-900">${formattedPrice}</p>
                
                <div class="text-[10px] text-gray-500 mt-1">
                    Jakarta Pusat
                </div>
                
                <div class="text-[10px] text-yellow-500 mt-1">
                    ⭐ ${product.rating.rate} 
                    <span class="text-gray-400 ml-1">Terjual 100+</span>
                </div>
            </div>
        </div>
    `;
}

// 4. Fungsi Utama Fetch & Render
async function initProductDisplay() {
    // 4.1. Tampilkan status loading
    container.innerHTML = '<p class="text-center col-span-full text-gray-500 py-4">Memuat data...</p>';

    try {
        // 4.2. Fetch Data
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        const products = await response.json();
        
        // 4.3. Render ke DOM
        container.innerHTML = ''; // Hapus loading
        
        if (products.length > 0) {
            // Gabungkan semua string HTML produk
            const productsHtml = products.map(createProductCardHtml).join('');
            
            // Inject ke container (Rendering)
            container.innerHTML = productsHtml;
        } else {
            container.innerHTML = '<p class="text-center col-span-full text-gray-500 py-4">Tidak ada produk ditemukan.</p>';
        }

    } catch (error) {
        // 4.4. Tangani error
        console.error("Gagal memuat produk:", error);
        container.innerHTML = '<p class="text-center col-span-full text-red-600 py-4">Gagal memuat data (Check Console).</p>';
    }
}

// 5. Eksekusi
document.addEventListener('DOMContentLoaded', initProductDisplay);