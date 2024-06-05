function sendMessage() {
    var namaPengguna = document.getElementById('nama_pengguna').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var massagers = document.getElementById('massagers').value;

    var pesan = "Hallo Imam \n" +
                "Nama saya : " + namaPengguna + "\n" +
                "Dengan email : " + email + "\n" +
                "Sebagai : " + subject + "\n" +
                massagers;

    var adminPhone = "6285788322061";

    var whatsappURL = "https://api.whatsapp.com/send?phone=" + adminPhone + "&text=" + encodeURIComponent(pesan);

    window.open(whatsappURL, '_blank');

    document.getElementById("submitButton").style.display = "none";
    document.getElementById("success_fail_info").innerHTML = "Message sent successfully!";
}

// Function to show notification
function showNotification() {
    const notification = document.getElementById('notification');
    const backdrop = document.getElementById('backdrop');
    notification.style.display = 'block';
    backdrop.style.display = 'block';
}

// Function to close notification
function closeNotification() {
    const notification = document.getElementById('notification');
    const backdrop = document.getElementById('backdrop');
    notification.style.display = 'none';
    backdrop.style.display = 'none';
}
