const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const todoApp = document.querySelector('.todo-app');
const messageContainer = document.getElementById("message-container");
const keyInfoContainer = document.getElementById("key-info-container");

// Alarmları bir diziye koyun
const alerts = [
    "Hedef belirlemek, görünmeyeni görünür hale getirmenin ilk adımıdır. 🙂",
    "Ulaşamayacağın hedefler koymalısın ki her zaman uğruna yaşayacak bir şeyin olsun. 🙂",
    "Hayattaki en büyük tehlikelerden birisi, insanın hedeflerini çok zor koyup başaramaması değil, çok basit koyup başarmasıdır. 🙂",
    "Kendinize o kadar büyük bir hedef belirleyin ki, ona ulaşmaya çalışırken insanların yerinde olmayı isteyecekleri kişi haline gelin. 🙂",
    "Başarı, cesaret ve kararlılıkla inşa edilir. 🙂",
    "Amacı olmayan gemiye hiçbir rüzgar yardım etmez. 🙂",
    "Hayatın asıl amacı, bilgi değil eylemdir. 🙂",
    "Hedef koyarsanız her şeyi yapabilirsiniz. Sadece kendini zorlaman gerekiyor. 🙂",
    "Bir hedef belirlediğinizde beyniniz bir görev listesi açar. 🙂",
    "Güçlü bir irade, her şeyin önündedir. 🙂"
];

// Görev ekleme fonksiyonu
function addTask() {
    if (inputBox.value === '') {
        // Rastgele bir alarmla kullanıcıyı bilgilendirin
        const randomIndex = Math.floor(Math.random() * alerts.length);
        alert(alerts[randomIndex]);
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);

        // Görev görünür hale getirme
        li.classList.add('show');
        
        showMessage("Görev eklendi!", 2000); // Görev ekleme mesajı
    }
    inputBox.value = '';
    saveData();
}

// Tüm görevleri temizleme fonksiyonu
function clearAll() {
    const items = listContainer.querySelectorAll('li');
    items.forEach(item => {
        item.classList.add('fade-out');
    });

    todoApp.classList.add('scale-down'); // Veya başka bir animasyon sınıfı
    
    setTimeout(() => {
        listContainer.innerHTML = '';
        saveData();
        todoApp.classList.remove('scale-down');
    }, 300); // Fade-out animasyon süresi
}

// Listeye tıklama olayları
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.classList.add('fade-out');
        setTimeout(() => {
            e.target.parentElement.remove();
            saveData();
            showMessage("Görev temizlendi!", 2000); // Tümünü temizle mesajı
        }, 300); // Fade-out animasyon süresi
    }
}, false);

// Enter tuşuna basma olayları
inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Enter tuşunun formu göndermesini engelle
        addTask();
        showMessage("Görev eklendi! (Enter)", 2000); // Enter tuşu mesajı
    }
});

// f2 tuşuna basma olayları
document.addEventListener("keydown", function(e) {
    if (e.key === "F2" || e.key === "F2") {
        e.preventDefault(); //f2 tuşunun varsayılan işlevlerini engelle
        clearAll();
        showMessage("Liste temizlendi! (F2)", 2000); // f2 tuşu mesajı
    }
});

function showMessage(message, duration) {
    messageContainer.textContent = message;
    messageContainer.classList.add('show');
    setTimeout(() => {
        messageContainer.classList.remove('show');
    }, duration);
}

// Tuş açıklamalarını döngüde gösterme
const keyMessages = [
    "Enter tuşuna basarak görev ekleyebilirsiniz.",
    "F2 tuşuna basarak tüm listeyi temizleyebilirsiniz."
];
let keyMessageIndex = 0;

function showKeyInfo() {
    keyInfoContainer.textContent = keyMessages[keyMessageIndex];
    keyInfoContainer.classList.add('show');
    keyMessageIndex = (keyMessageIndex + 1) % keyMessages.length;
}

// Mesajı sürekli döngüde göstermek için interval kullanma
setInterval(showKeyInfo, 3000); // Her 3 saniyede bir mesaj değişir

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    // Mevcut görevler için fade-in animasyonu
    document.querySelectorAll('#list-container li').forEach(li => {
        li.classList.add('show');
    });
}

showTask();
