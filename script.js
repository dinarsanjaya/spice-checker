let allowlist = []; // Variabel untuk menyimpan data dari allowlist.json

// Fungsi untuk mengambil data dari allowlist.json
async function loadAllowlist() {
  try {
    const response = await fetch("allowlist.json"); // Membaca file JSON
    if (!response.ok) {
      throw new Error("Gagal memuat data allowlist.");
    }
    allowlist = await response.json(); // Menyimpan data ke variabel allowlist
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fungsi untuk mengecek dompet
function checkWallets() {
  const input = document.getElementById("walletInput").value.trim();
  const wallets = input.split("\n").map((wallet) => wallet.trim()); // Bersihkan spasi di setiap baris
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Bersihkan hasil sebelumnya

  wallets.forEach((wallet) => {
    const foundWallet = allowlist.find((item) => item.wallet.trim() === wallet); // Cari dompet di allowlist
    const isAllowed = !!foundWallet; // Cek apakah dompet ditemukan
    const depositCap = foundWallet ? foundWallet.deposit_cap : "N/A"; // Ambil deposit_cap jika ditemukan

    const walletResult = document.createElement("div");
    walletResult.classList.add("wallet-result");
    walletResult.classList.add(isAllowed ? "valid" : "invalid");
    walletResult.textContent = `${wallet} - ${isAllowed ? "Valid" : "Tidak Valid"} (Deposit Cap: ${depositCap})`;
    resultDiv.appendChild(walletResult);
  });
}

// Event listener untuk tombol cek
document.getElementById("checkButton").addEventListener("click", checkWallets);

// Memuat data allowlist saat halaman dimuat
window.addEventListener("load", loadAllowlist);