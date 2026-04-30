/* RightAid Dummy Data Layer */

var PROVINCES = [
  { id: "AC", name: "Aceh", pctFloorDirt: 8.9, pctNoElec: 5.6, pctNoCar: 89.3, avgHHSize: 4.2, giniCoef: 0.318, povertyRate: 14.23 },
  { id: "SU", name: "Sumatera Utara", pctFloorDirt: 6.3, pctNoElec: 2.8, pctNoCar: 80.4, avgHHSize: 3.9, giniCoef: 0.328, povertyRate: 8.15 },
  { id: "SB", name: "Sumatera Barat", pctFloorDirt: 5.1, pctNoElec: 1.9, pctNoCar: 83.2, avgHHSize: 4.1, giniCoef: 0.299, povertyRate: 5.95 },
  { id: "RI", name: "Riau", pctFloorDirt: 4.8, pctNoElec: 3.2, pctNoCar: 78.6, avgHHSize: 3.8, giniCoef: 0.317, povertyRate: 6.9 },
  { id: "JA", name: "Jambi", pctFloorDirt: 7.2, pctNoElec: 4.1, pctNoCar: 84.5, avgHHSize: 4.0, giniCoef: 0.322, povertyRate: 7.69 },
  { id: "SS", name: "Sumatera Selatan", pctFloorDirt: 10.4, pctNoElec: 5.8, pctNoCar: 86.1, avgHHSize: 3.9, giniCoef: 0.332, povertyRate: 11.82 },
  { id: "BE", name: "Bengkulu", pctFloorDirt: 11.2, pctNoElec: 6.3, pctNoCar: 88.4, avgHHSize: 4.1, giniCoef: 0.311, povertyRate: 14.09 },
  { id: "LA", name: "Lampung", pctFloorDirt: 9.8, pctNoElec: 4.9, pctNoCar: 85.7, avgHHSize: 4.0, giniCoef: 0.327, povertyRate: 11.11 },
  { id: "BB", name: "Kep. Bangka Belitung", pctFloorDirt: 3.2, pctNoElec: 1.4, pctNoCar: 72.3, avgHHSize: 3.5, giniCoef: 0.258, povertyRate: 4.63 },
  { id: "KR", name: "Kepulauan Riau", pctFloorDirt: 3.9, pctNoElec: 2.1, pctNoCar: 74.8, avgHHSize: 3.6, giniCoef: 0.341, povertyRate: 5.97 },
  { id: "JK", name: "DKI Jakarta", pctFloorDirt: 0.8, pctNoElec: 0.1, pctNoCar: 61.2, avgHHSize: 3.2, giniCoef: 0.412, povertyRate: 4.3 },
  { id: "JB", name: "Jawa Barat", pctFloorDirt: 4.2, pctNoElec: 1.1, pctNoCar: 82.3, avgHHSize: 3.8, giniCoef: 0.405, povertyRate: 7.44 },
  { id: "JT", name: "Jawa Tengah", pctFloorDirt: 5.8, pctNoElec: 0.9, pctNoCar: 86.1, avgHHSize: 3.5, giniCoef: 0.373, povertyRate: 10.47 },
  { id: "YO", name: "DI Yogyakarta", pctFloorDirt: 3.6, pctNoElec: 0.4, pctNoCar: 79.8, avgHHSize: 3.3, giniCoef: 0.437, povertyRate: 11.04 },
  { id: "JI", name: "Jawa Timur", pctFloorDirt: 7.1, pctNoElec: 1.4, pctNoCar: 84.7, avgHHSize: 3.7, giniCoef: 0.367, povertyRate: 9.79 },
  { id: "BT", name: "Banten", pctFloorDirt: 3.4, pctNoElec: 0.8, pctNoCar: 80.1, avgHHSize: 3.7, giniCoef: 0.388, povertyRate: 6.55 },
  { id: "BA", name: "Bali", pctFloorDirt: 2.1, pctNoElec: 0.4, pctNoCar: 68.9, avgHHSize: 3.4, giniCoef: 0.368, povertyRate: 4.25 },
  { id: "NB", name: "Nusa Tenggara Barat", pctFloorDirt: 16.3, pctNoElec: 9.2, pctNoCar: 91.4, avgHHSize: 4.3, giniCoef: 0.371, povertyRate: 13.85 },
  { id: "NTT", name: "Nusa Tenggara Timur", pctFloorDirt: 28.4, pctNoElec: 18.2, pctNoCar: 95.6, avgHHSize: 4.3, giniCoef: 0.352, povertyRate: 19.48 },
  { id: "KB", name: "Kalimantan Barat", pctFloorDirt: 7.6, pctNoElec: 5.4, pctNoCar: 83.2, avgHHSize: 3.9, giniCoef: 0.322, povertyRate: 6.84 },
  { id: "KH", name: "Kalimantan Tengah", pctFloorDirt: 4.8, pctNoElec: 3.6, pctNoCar: 79.4, avgHHSize: 3.7, giniCoef: 0.318, povertyRate: 5.16 },
  { id: "KS", name: "Kalimantan Selatan", pctFloorDirt: 3.9, pctNoElec: 2.1, pctNoCar: 77.8, avgHHSize: 3.6, giniCoef: 0.334, povertyRate: 4.61 },
  { id: "KT", name: "Kalimantan Timur", pctFloorDirt: 3.8, pctNoElec: 4.1, pctNoCar: 77.5, avgHHSize: 3.6, giniCoef: 0.333, povertyRate: 6.11 },
  { id: "KU", name: "Kalimantan Utara", pctFloorDirt: 5.2, pctNoElec: 6.8, pctNoCar: 81.3, avgHHSize: 3.8, giniCoef: 0.298, povertyRate: 6.83 },
  { id: "SA", name: "Sulawesi Utara", pctFloorDirt: 5.4, pctNoElec: 2.3, pctNoCar: 79.6, avgHHSize: 4.0, giniCoef: 0.369, povertyRate: 7.46 },
  { id: "ST", name: "Sulawesi Tengah", pctFloorDirt: 11.8, pctNoElec: 7.2, pctNoCar: 88.9, avgHHSize: 4.2, giniCoef: 0.329, povertyRate: 12.15 },
  { id: "SL", name: "Sulawesi Selatan", pctFloorDirt: 9.7, pctNoElec: 3.2, pctNoCar: 87.2, avgHHSize: 4.0, giniCoef: 0.371, povertyRate: 8.7 },
  { id: "SG", name: "Sulawesi Tenggara", pctFloorDirt: 12.4, pctNoElec: 8.1, pctNoCar: 89.7, avgHHSize: 4.1, giniCoef: 0.388, povertyRate: 11.34 },
  { id: "GO", name: "Gorontalo", pctFloorDirt: 13.6, pctNoElec: 6.4, pctNoCar: 90.2, avgHHSize: 4.2, giniCoef: 0.418, povertyRate: 15.14 },
  { id: "SR", name: "Sulawesi Barat", pctFloorDirt: 14.1, pctNoElec: 9.8, pctNoCar: 91.6, avgHHSize: 4.4, giniCoef: 0.364, povertyRate: 11.62 },
  { id: "MA", name: "Maluku", pctFloorDirt: 18.2, pctNoElec: 12.4, pctNoCar: 92.8, avgHHSize: 4.5, giniCoef: 0.319, povertyRate: 16.23 },
  { id: "MU", name: "Maluku Utara", pctFloorDirt: 8.4, pctNoElec: 6.9, pctNoCar: 88.4, avgHHSize: 4.3, giniCoef: 0.308, povertyRate: 7.27 },
  { id: "PB", name: "Papua Barat", pctFloorDirt: 22.8, pctNoElec: 16.4, pctNoCar: 93.7, avgHHSize: 4.7, giniCoef: 0.397, povertyRate: 20.49 },
  { id: "PA", name: "Papua", pctFloorDirt: 31.4, pctNoElec: 42.8, pctNoCar: 96.4, avgHHSize: 5.0, giniCoef: 0.371, povertyRate: 26.8 },
  { id: "PS", name: "Papua Selatan", pctFloorDirt: 29.8, pctNoElec: 38.6, pctNoCar: 95.8, avgHHSize: 4.9, giniCoef: 0.382, povertyRate: 27.4 },
  { id: "PT", name: "Papua Tengah", pctFloorDirt: 34.2, pctNoElec: 51.3, pctNoCar: 97.1, avgHHSize: 5.1, giniCoef: 0.391, povertyRate: 30.12 },
  { id: "PPB", name: "Papua Pegunungan", pctFloorDirt: 52.1, pctNoElec: 64.3, pctNoCar: 98.1, avgHHSize: 5.1, giniCoef: 0.389, povertyRate: 32.97 },
  { id: "PD", name: "Papua Barat Daya", pctFloorDirt: 24.6, pctNoElec: 21.8, pctNoCar: 94.2, avgHHSize: 4.8, giniCoef: 0.374, povertyRate: 22.15 }
];

var KECAMATAN_MAP = {
  "AC": ["Kec. Banda Aceh", "Kec. Meuraxa", "Kec. Baiturrahman", "Kec. Lueng Bata", "Kec. Kuta Alam", "Kec. Syiah Kuala", "Kec. Lhokseumawe", "Kec. Langsa Kota", "Kec. Sabang", "Kec. Aceh Besar"],
  "SU": ["Kec. Medan Kota", "Kec. Medan Barat", "Kec. Medan Helvetia", "Kec. Binjai Kota", "Kec. Pematangsiantar", "Kec. Tebing Tinggi", "Kec. Deli Tua", "Kec. Sunggal", "Kec. Percut Sei Tuan", "Kec. Lubuk Pakam"],
  "SB": ["Kec. Padang Barat", "Kec. Padang Timur", "Kec. Bukittinggi", "Kec. Payakumbuh", "Kec. Padang Panjang", "Kec. Solok Kota", "Kec. Sawahan", "Kec. Lubuk Begalung", "Kec. Pariaman", "Kec. Agam"],
  "RI": ["Kec. Pekanbaru Kota", "Kec. Sail", "Kec. Marpoyan Damai", "Kec. Tampan", "Kec. Dumai Kota", "Kec. Bangkinang", "Kec. Pasir Pengaraian", "Kec. Tembilahan", "Kec. Siak", "Kec. Rengat"],
  "JA": ["Kec. Jambi Kota", "Kec. Jelutung", "Kec. Pasar Jambi", "Kec. Sungai Penuh", "Kec. Muaro Bungo", "Kec. Muara Bulian", "Kec. Sarolangun", "Kec. Bangko", "Kec. Kuala Tungkal", "Kec. Rimbo Bujang"],
  "SS": ["Kec. Palembang Ilir Barat", "Kec. Kalidoni", "Kec. Plaju", "Kec. Prabumulih", "Kec. Lubuklinggau", "Kec. Muara Enim", "Kec. Sekayu", "Kec. Indralaya", "Kec. Kayuagung", "Kec. Baturaja"],
  "BE": ["Kec. Teluk Segara", "Kec. Sungai Serut", "Kec. Gading Cempaka", "Kec. Selebar", "Kec. Curup", "Kec. Mukomuko", "Kec. Arga Makmur", "Kec. Manna", "Kec. Kaur Selatan", "Kec. Kepahiang"],
  "LA": ["Kec. Tanjung Karang Pusat", "Kec. Kedaton", "Kec. Rajabasa", "Kec. Metro Pusat", "Kec. Pringsewu", "Kec. Kotaagung", "Kec. Kalianda", "Kec. Menggala", "Kec. Blambangan Umpu", "Kec. Liwa"],
  "BB": ["Kec. Pangkalpinang", "Kec. Girimaya", "Kec. Gerunggang", "Kec. Sungailiat", "Kec. Muntok", "Kec. Toboali", "Kec. Koba", "Kec. Manggar", "Kec. Tanjungpandan", "Kec. Badau"],
  "KR": ["Kec. Batam Kota", "Kec. Sekupang", "Kec. Nongsa", "Kec. Batu Aji", "Kec. Tanjungpinang", "Kec. Bintan Timur", "Kec. Karimun", "Kec. Natuna", "Kec. Lingga", "Kec. Anambas"],
  "JK": ["Kec. Gambir", "Kec. Sawah Besar", "Kec. Kemayoran", "Kec. Senen", "Kec. Cempaka Putih", "Kec. Menteng", "Kec. Tanah Abang", "Kec. Penjaringan", "Kec. Pademangan", "Kec. Tanjung Priok"],
  "JB": ["Kec. Bandung Utara", "Kec. Cimahi", "Kec. Bogor Tengah", "Kec. Bekasi Barat", "Kec. Depok Timur", "Kec. Sukabumi", "Kec. Tasikmalaya", "Kec. Cianjur", "Kec. Garut Kota", "Kec. Purwakarta"],
  "JT": ["Kec. Semarang Tengah", "Kec. Tembalang", "Kec. Banyumanik", "Kec. Solo Kota", "Kec. Cilacap", "Kec. Purwokerto", "Kec. Magelang", "Kec. Kudus", "Kec. Demak", "Kec. Pati"],
  "YO": ["Kec. Gondokusuman", "Kec. Umbulharjo", "Kec. Danurejan", "Kec. Mergangsan", "Kec. Kotagede", "Kec. Depok Sleman", "Kec. Mlati", "Kec. Bantul", "Kec. Wates Kulon Progo", "Kec. Wonosari"],
  "JI": ["Kec. Genteng Surabaya", "Kec. Gubeng", "Kec. Wonokromo", "Kec. Malang Kota", "Kec. Kediri", "Kec. Blitar", "Kec. Madiun", "Kec. Mojokerto", "Kec. Jember", "Kec. Banyuwangi"],
  "BT": ["Kec. Serang Kota", "Kec. Cipocok Jaya", "Kec. Cilegon", "Kec. Tangerang", "Kec. Ciputat", "Kec. Pamulang", "Kec. Serpong", "Kec. Pandeglang", "Kec. Rangkasbitung", "Kec. Malingping"],
  "BA": ["Kec. Denpasar Utara", "Kec. Denpasar Selatan", "Kec. Kuta", "Kec. Ubud", "Kec. Singaraja", "Kec. Tabanan", "Kec. Gianyar", "Kec. Klungkung", "Kec. Bangli", "Kec. Negara"],
  "NB": ["Kec. Ampenan", "Kec. Cakranegara", "Kec. Mataram", "Kec. Praya", "Kec. Selong", "Kec. Sumbawa", "Kec. Dompu", "Kec. Bima Kota", "Kec. Taliwang", "Kec. Pemenang"],
  "NTT": ["Kec. Kupang Tengah", "Kec. Alak", "Kec. Oebobo", "Kec. Ende", "Kec. Maumere", "Kec. Ruteng", "Kec. Labuan Bajo", "Kec. Atambua", "Kec. Kefamenanu", "Kec. Waingapu"],
  "KB": ["Kec. Pontianak Kota", "Kec. Pontianak Utara", "Kec. Singkawang", "Kec. Sambas", "Kec. Mempawah", "Kec. Sanggau", "Kec. Ketapang", "Kec. Sintang", "Kec. Putussibau", "Kec. Sekadau"],
  "KH": ["Kec. Palangka Raya", "Kec. Jekan Raya", "Kec. Sampit", "Kec. Pangkalan Bun", "Kec. Buntok", "Kec. Muara Teweh", "Kec. Kuala Kapuas", "Kec. Pulang Pisau", "Kec. Kasongan", "Kec. Sukamara"],
  "KS": ["Kec. Banjarmasin Tengah", "Kec. Banjarmasin Utara", "Kec. Banjarbaru", "Kec. Martapura", "Kec. Kandangan", "Kec. Amuntai", "Kec. Barabai", "Kec. Kotabaru", "Kec. Pelaihari", "Kec. Tanjung"],
  "KT": ["Kec. Samarinda Ulu", "Kec. Sungai Pinang", "Kec. Balikpapan Kota", "Kec. Balikpapan Utara", "Kec. Tenggarong", "Kec. Bontang", "Kec. Sangatta", "Kec. Penajam", "Kec. Tanah Grogot", "Kec. Sendawar"],
  "KU": ["Kec. Tanjung Selor", "Kec. Tanjung Palas", "Kec. Tarakan Tengah", "Kec. Tarakan Utara", "Kec. Nunukan", "Kec. Sebatik", "Kec. Malinau Kota", "Kec. Long Bagun", "Kec. Krayan", "Kec. Peso"],
  "SA": ["Kec. Wenang", "Kec. Sario", "Kec. Tikala", "Kec. Tuminting", "Kec. Tomohon", "Kec. Tondano", "Kec. Kotamobagu", "Kec. Bitung", "Kec. Airmadidi", "Kec. Ratahan"],
  "ST": ["Kec. Palu Timur", "Kec. Palu Barat", "Kec. Mantikulore", "Kec. Poso", "Kec. Luwuk", "Kec. Toli-Toli", "Kec. Donggala", "Kec. Morowali", "Kec. Ampana", "Kec. Buol"],
  "SL": ["Kec. Makassar", "Kec. Rappocini", "Kec. Tamalate", "Kec. Parepare", "Kec. Palopo", "Kec. Bone", "Kec. Soppeng", "Kec. Wajo", "Kec. Pinrang", "Kec. Bulukumba"],
  "SG": ["Kec. Kendari Barat", "Kec. Kendari", "Kec. Bau-Bau", "Kec. Unaaha", "Kec. Lasolo", "Kec. Kolaka", "Kec. Andoolo", "Kec. Raha", "Kec. Pasarwajo", "Kec. Wanggudu"],
  "GO": ["Kec. Kota Barat", "Kec. Kota Selatan", "Kec. Dungingi", "Kec. Limboto", "Kec. Marisa", "Kec. Kwandang", "Kec. Tilamuta", "Kec. Sumalata", "Kec. Atinggola", "Kec. Paguat"],
  "SR": ["Kec. Mamuju", "Kec. Mamuju Tengah", "Kec. Pasangkayu", "Kec. Polewali", "Kec. Majene", "Kec. Mamasa", "Kec. Tinambung", "Kec. Balanipa", "Kec. Tubo", "Kec. Sendana"],
  "MA": ["Kec. Sirimau", "Kec. Baguala", "Kec. Nusaniwe", "Kec. Teluk Ambon", "Kec. Tual", "Kec. Masohi", "Kec. Namlea", "Kec. Saumlaki", "Kec. Dobo", "Kec. Amahai"],
  "MU": ["Kec. Ternate Selatan", "Kec. Ternate Tengah", "Kec. Tidore", "Kec. Sofifi", "Kec. Tobelo", "Kec. Labuha", "Kec. Sanana", "Kec. Weda", "Kec. Jailolo", "Kec. Maba"],
  "PB": ["Kec. Manokwari", "Kec. Manokwari Selatan", "Kec. Sorong", "Kec. Sorong Selatan", "Kec. Fakfak", "Kec. Kaimana", "Kec. Bintuni", "Kec. Babo", "Kec. Ransiki", "Kec. Prafi"],
  "PA": ["Kec. Jayapura Utara", "Kec. Jayapura Selatan", "Kec. Abepura", "Kec. Sentani", "Kec. Nabire", "Kec. Merauke", "Kec. Wamena", "Kec. Timika", "Kec. Biak", "Kec. Serui"],
  "PS": ["Kec. Merauke", "Kec. Tanah Miring", "Kec. Jagebob", "Kec. Okaba", "Kec. Boven Digoel", "Kec. Asiki", "Kec. Waropko", "Kec. Jair", "Kec. Mappi", "Kec. Kepi"],
  "PT": ["Kec. Nabire", "Kec. Teluk Kimi", "Kec. Dogiyai", "Kec. Kamu", "Kec. Deiyai", "Kec. Tigi", "Kec. Paniai", "Kec. Enarotali", "Kec. Intan Jaya", "Kec. Agadide"],
  "PPB": ["Kec. Wamena", "Kec. Kurulu", "Kec. Hubikiak", "Kec. Asologaima", "Kec. Bolakme", "Kec. Puncak Jaya", "Kec. Mulia", "Kec. Yamo", "Kec. Mamberamo", "Kec. Tolikara"],
  "PD": ["Kec. Sorong Kota", "Kec. Sorong Barat", "Kec. Sorong Timur", "Kec. Raja Ampat", "Kec. Waisai", "Kec. Aimas", "Kec. Makbon", "Kec. Salawati", "Kec. Teminabuan", "Kec. Kokoda"]
};

var SCENARIOS = [
  { id: "normal",  label: "Kondisi Normal",  desc: "Kondisi baseline DTSEN aktual. Digunakan sebagai acuan perbandingan performa model." },
  { id: "phk",     label: "PHK Massal",      desc: "Proyeksi dampak kenaikan pengangguran 5% di sektor manufaktur terhadap akurasi data DTSEN." },
  { id: "bencana", label: "Pasca-Bencana",   desc: "10% rumah tangga mengalami perubahan kondisi mendadak yang menaikkan kerentanan tanpa ter-update di sistem bansos." }
];
/* Seeded pseudo-RNG (Mulberry32) */
function seededRng(seed) {
  var s = (seed * 2654435761) >>> 0;
  return function() {
    s = (s + 0x6D2B79F5) >>> 0;
    var t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateHouseholds(provinceId, scenario, anomalyPct) {
  var prov = null;
  for (var pi = 0; pi < PROVINCES.length; pi++) {
    if (PROVINCES[pi].id === provinceId) { prov = PROVINCES[pi]; break; }
  }
  if (!prov) prov = PROVINCES[0];

  var seed = provinceId.charCodeAt(0) + scenario.length;
  var rng = seededRng(seed);

  var sectors    = ["Pertanian","Manufaktur","Perdagangan","Jasa","Transportasi","Konstruksi","Lainnya"];
  var eduLevels  = ["Tidak Sekolah","SD","SMP","SMA","Diploma","S1"];
  var floors     = ["Tanah","Semen","Keramik","Marmer"];
  var walls      = ["Bambu","Kayu","Bata Tanpa Plester","Bata Plester"];
  var waterSrc   = ["Sumur Tidak Terlindungi","Sumur Terlindungi","PAM/PDAM","Air Kemasan"];
  var sanitation = ["Tidak Ada","Jamban Bersama","Jamban Sendiri Sederhana","Jamban Sendiri Layak"];
  var kecList    = KECAMATAN_MAP[provinceId] || ["Kec. Pusat","Kec. Utara","Kec. Selatan","Kec. Barat","Kec. Timur"];

  var results = [];
  for (var i = 0; i < 100; i++) {
    var isAnomaly = rng() < anomalyPct / 100;
    var decile    = isAnomaly ? Math.floor(rng() * 4) + 4 : Math.floor(rng() * 3) + 1;
    var pmtDecile = isAnomaly ? (rng() < 0.55 ? Math.max(1, decile - 3) : decile) : (rng() < 0.12 ? Math.min(10, decile + 1) : decile);
    var mlDecile  = isAnomaly ? decile : (rng() < 0.05 ? Math.min(10, decile + 1) : decile);

    var floorIdx = decile <= 3 ? Math.floor(rng() * 2) : Math.floor(rng() * 4);
    var ownCar   = decile >= 7 && rng() < 0.6;
    var ownMotor = rng() < (0.9 - decile * 0.07);
    var expenditure = Math.round(800000 + (10 - decile) * 350000 + rng() * 200000);
    var pmtScore    = Math.round(30 + (10 - pmtDecile) * 6.5 + rng() * 8);
    var mlScore     = Math.round(30 + (10 - mlDecile) * 6.8 + rng() * 6);

    var status = "normal";
    if (isAnomaly) {
      if (scenario === "phk") status = "phk_risk";
      else if (scenario === "bencana") status = "disaster_risk";
      else status = "anomaly";
    }

    results.push({
      id:          "KK-" + prov.id + "-" + String(i + 1).padStart(4, "0"),
      kecamatan:   kecList[Math.floor(rng() * kecList.length)],
      hhSize:      Math.round(2 + rng() * 5),
      headAge:     Math.round(28 + rng() * 42),
      headGender:  rng() < 0.82 ? "L" : "P",
      edu:         eduLevels[Math.floor(rng() * (decile <= 3 ? 3 : 6))],
      sector:      sectors[Math.floor(rng() * sectors.length)],
      floor:       floors[floorIdx],
      wall:        walls[Math.floor(rng() * (decile <= 3 ? 2 : 4))],
      floorArea:   Math.round(30 + decile * 12 + rng() * 40),
      water:       waterSrc[Math.floor(rng() * (decile <= 3 ? 2 : 4))],
      sanitation:  sanitation[Math.floor(rng() * (decile <= 3 ? 2 : 4))],
      ownCar:      ownCar,
      ownMotor:    ownMotor,
      ownLand:     rng() < 0.3,
      expenditure: expenditure,
      pmtScore:    pmtScore,
      mlScore:     mlScore,
      pmtDecile:   Math.max(1, Math.min(10, pmtDecile)),
      mlDecile:    Math.max(1, Math.min(10, mlDecile)),
      actualDecile: decile,
      isAnomaly:   isAnomaly,
      status:      status,
      confidence:  parseFloat((0.7 + rng() * 0.29).toFixed(2))
    });
  }
  return results;
}

var NATIONAL_STATS = {
  poorPopulation: "24,06 Juta",
  povertyRate:    "8,57%",
  giniCoef:       "0,381",
  socialBudget:   "Rp496,8 T",
  exclusionError: "46%",
  inclusionError: "23%",
  dtsenProgress:  78
};

var ACCURACY_COMPARISON = {
  pmt: { f1: 0.71, auc: 0.74, exclusionErr: 28.4, inclusionErr: 22.1 },
  ml:  { f1: 0.88, auc: 0.93, exclusionErr: 14.7, inclusionErr: 11.3 }
};

var SHAP_DEMO = [
  { feature: "Kepemilikan Kendaraan Roda 4", value: +2.31 },
  { feature: "Pengeluaran per Kapita",        value: +1.84 },
  { feature: "Tingkat Pendidikan KRT",        value: +1.12 },
  { feature: "Sektor Pekerjaan (Manufaktur)", value: -0.87 },
  { feature: "Kondisi Sanitasi",              value: -1.41 },
  { feature: "Jenis Lantai (Semen)",          value: -1.56 },
  { feature: "Luas Lantai per Kapita",        value: -1.78 }
];

var CM_DATA = {
  normal:  { tp: 4120, fp: 380,  fn: 290,  tn: 5210 },
  phk:     { tp: 3980, fp: 720,  fn: 850,  tn: 4450 },
  bencana: { tp: 3600, fp: 680,  fn: 1020, tn: 4700 }
};

var CM_DATA_PMT = {
  normal:  { tp: 3210, fp: 790,  fn: 1080, tn: 4920 },
  phk:     { tp: 2870, fp: 1130, fn: 1640, tn: 4360 },
  bencana: { tp: 2500, fp: 1200, fn: 2180, tn: 4120 }
};

var DECILE_DIST = {
  normal: {
    actual: [820,760,710,680,640,600,560,510,470,250],
    pmt:    [760,720,640,700,670,610,570,480,470,380],
    ml:     [810,755,705,685,635,598,558,505,468,281]
  },
  phk: {
    actual: [920,880,810,730,640,520,450,410,380,260],
    pmt:    [680,720,670,720,660,590,530,510,470,450],
    ml:     [890,860,790,720,635,515,445,405,378,362]
  },
  bencana: {
    actual: [980,950,870,760,620,490,410,370,340,210],
    pmt:    [660,700,650,730,640,590,510,490,490,540],
    ml:     [960,935,855,750,615,485,405,365,338,292]
  }
};

var MONTHLY_TREND = [
  { month: "Jul", exclusion: 32.1, inclusion: 25.4 },
  { month: "Ags", exclusion: 31.4, inclusion: 24.8 },
  { month: "Sep", exclusion: 30.8, inclusion: 23.9 },
  { month: "Okt", exclusion: 29.5, inclusion: 23.1 },
  { month: "Nov", exclusion: 28.7, inclusion: 22.6 },
  { month: "Des", exclusion: 27.9, inclusion: 21.8 },
  { month: "Jan", exclusion: 26.4, inclusion: 20.9 },
  { month: "Feb", exclusion: 25.1, inclusion: 20.1 },
  { month: "Mar", exclusion: 24.3, inclusion: 19.5 },
  { month: "Apr", exclusion: 14.7, inclusion: 11.3 }
];

var POLICY_TEMPLATES = {
  normal: {
    title: "Laporan Evaluasi Mis-Targeting Bansos - Kondisi Baseline",
    findings: "Berdasarkan analisis model ML-PMT RightAid terhadap data {province}, teridentifikasi bahwa dalam kondisi baseline, sekitar 14,7% rumah tangga mengalami exclusion error yaitu kelompok miskin yang belum tercatat sebagai penerima bansos sementara 11,3% mengalami inclusion error. Angka ini lebih rendah 48% dibandingkan PMT konvensional yang mencatat exclusion error 28,4%. Model XGBoost dengan AUC-ROC 0,93 secara konsisten mengungguli baseline Logistic Regression (AUC 0,81) dalam mendeteksi inkonsistensi profil rumah tangga.",
    demographics: "Kelompok yang paling rentan terhadap exclusion error di {province} adalah rumah tangga dengan kepala rumah tangga berusia 45-64 tahun, bekerja di sektor informal perdagangan dan pertanian, dengan tingkat pendidikan tidak tamat SMP. Inkonsistensi terbesar ditemukan pada rumah tangga yang memiliki kendaraan bermotor roda dua tetapi kondisi hunian dan sanitasinya berada di bawah standar kelayakan.",
    recommendations: "1. Prioritaskan verifikasi lapangan untuk 1.470 rumah tangga yang diprediksi ML-PMT sebagai layak penerima tetapi tidak tercatat dalam DTSEN. 2. Tinjau ulang bobot variabel aset kendaraan dalam formula PMT konvensional - kontribusi SHAP menunjukkan bobot yang tidak proporsional. 3. Integrasikan data pajak kendaraan bermotor sebagai variabel silang validasi. 4. Lakukan pembaruan data untuk 380 rumah tangga yang teridentifikasi sebagai inclusion error."
  },
  phk: {
    title: "Laporan Evaluasi Dampak PHK Massal terhadap Akurasi Data Bansos",
    findings: "Analisis dampak PHK massal di sektor manufaktur {province} menghasilkan estimasi bahwa 18,2% rumah tangga yang seharusnya naik ke prioritas desil 1-3 tidak terdeteksi oleh PMT konvensional. Model ML-PMT berhasil mengidentifikasi 89% dari kelompok terdampak PHK ini, dibandingkan PMT konvensional yang hanya mendeteksi 51%. Selisih 38 persen poin ini setara dengan ribuan keluarga yang kehilangan akses bansos di tengah krisis ekonomi.",
    demographics: "Kelompok paling terdampak adalah pekerja manufaktur berusia 25-44 tahun dengan tanggungan 3-5 anggota keluarga, yang sebelumnya berada di desil 4-6. Pasca-PHK kondisi ekonomi turun drastis namun tidak segera tercermin dalam DTSEN. Inkonsistensi khas: profil hunian masih menunjukkan kondisi menengah tetapi pengeluaran aktual sudah turun di bawah garis kemiskinan.",
    recommendations: "1. Aktifkan mekanisme fast-track pendataan untuk pekerja yang terkena PHK massal dengan mengintegrasikan data BPJS Ketenagakerjaan sebagai trigger. 2. Tambahkan 850 rumah tangga yang teridentifikasi sebagai false negative ke dalam daftar calon penerima sementara. 3. Koordinasikan dengan Dinas Tenaga Kerja {province} untuk mendapatkan daftar perusahaan yang melakukan PHK massal. 4. Pertimbangkan penerapan bansos temporer selama 6 bulan untuk kelompok terdampak."
  },
  bencana: {
    title: "Laporan Evaluasi Dampak Bencana terhadap Akurasi Data Bansos",
    findings: "Skenario pasca-bencana di {province} menunjukkan dampak paling signifikan terhadap akurasi sistem bansos. Model ML-PMT mengidentifikasi bahwa 22,4% rumah tangga terdampak bencana belum tercatat dalam sistem karena data DTSEN masih mencerminkan kondisi sebelum bencana. PMT konvensional hanya mampu menangkap 42% dari kelompok terdampak ini, sementara ML-PMT mencapai 79%.",
    demographics: "Rumah tangga paling terdampak adalah kelompok yang sebelumnya berada di desil 4-7 dengan kondisi hunian moderat. Bencana menyebabkan kerusakan fisik hunian yang mengubah profil mereka secara mendadak, namun data ini belum masuk ke DTSEN. Ketidaksesuaian terdeteksi: skor PMT aktif masih menunjukkan kondisi hunian layak padahal kondisi riil sudah turun drastis.",
    recommendations: "1. Implementasikan protokol emergency data update dalam 72 jam setelah bencana dinyatakan, dengan Tim Reaksi Cepat Kemensos yang dilengkapi form digital lapangan. 2. Aktifkan mekanisme penyaluran bansos darurat berbasis koordinat GPS untuk rumah tangga di zona terdampak. 3. Gunakan citra satelit dan data BNPB sebagai data silang. 4. Prioritaskan 1.020 rumah tangga false negative untuk verifikasi lapangan dalam 7 hari pertama."
  }
};

window.EkoData = {
  PROVINCES: PROVINCES,
  SCENARIOS: SCENARIOS,
  NATIONAL_STATS: NATIONAL_STATS,
  ACCURACY_COMPARISON: ACCURACY_COMPARISON,
  SHAP_DEMO: SHAP_DEMO,
  CM_DATA: CM_DATA,
  CM_DATA_PMT: CM_DATA_PMT,
  DECILE_DIST: DECILE_DIST,
  MONTHLY_TREND: MONTHLY_TREND,
  POLICY_TEMPLATES: POLICY_TEMPLATES,
  generateHouseholds: generateHouseholds
};
