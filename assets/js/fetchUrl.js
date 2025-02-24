document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Mencegah reload halaman

      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData.entries()); // Konversi ke JSON

      const actionUrl = form.getAttribute("action"); // Ambil action dari form
      if (!actionUrl) {
        console.error("Form action URL tidak ditemukan!");
        return;
      }

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          body: JSON.stringify(jsonData),
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        console.log("Result dari server: ", result); // Log respons server

        if (response.ok) {
          // SweetAlert untuk sukses
          Swal.fire({
            title: "Success!",
            text: result.message,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Redirect sesuai halaman
            if (actionUrl.includes("/proses-login")) {
              localStorage.setItem("token", result.token);
              window.location.href = "/dashboard"; // Redirect setelah login
            } else if (actionUrl.includes("/proses-register")) {
              window.location.href = "/"; // Redirect ke login setelah registrasi
            }
          });
        } else {
          // SweetAlert untuk error
          Swal.fire({
            title: "Warning!",
            text: result.message,
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        // SweetAlert untuk error server
        Swal.fire({
          title: "Terjadi Kesalahan!",
          text: "Terjadi kesalahan pada server.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Token yang dikirim:", `Bearer ${token}`); // Menampilkan token yang dikirim

    fetch("/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Mengirim token dalam format Bearer
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json(); // Pastikan mengembalikan JSON
      })
      .then((data) => {
        console.log("Data dari server:", data);
      })
      .catch((error) => console.error("Error:", error));
  } else {
    console.log("Token tidak ditemukan, arahkan ke halaman login");
    window.location.href = "/"; // Arahkan ke halaman login jika token tidak ada
  }
});


