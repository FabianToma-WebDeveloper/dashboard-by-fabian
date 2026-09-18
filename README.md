# 📊 E-Commerce Analytics Dashboard

Un dashboard modern și responsive pentru administrarea și analiza unui magazin online, realizat cu **HTML5, CSS3 și JavaScript Vanilla**.

Proiectul simulează o aplicație de administrare e-commerce și include gestionarea comenzilor, clienților, produselor și echipei, rapoarte interactive, notificări și setări persistente.

> Proiect realizat pentru portofoliul meu de Frontend Developer, cu accent pe manipularea DOM-ului, lucrul cu date, interactivitate și organizarea codului JavaScript.

---

## 🔗 Demo Live

👉 **Live Demo:**  
https://dashboard-by-fabian.vercel.app/


## ✨ Funcționalități

Dashboard-ul este împărțit în mai multe secțiuni funcționale:

### 📈 Prezentare generală

- KPI-uri pentru venituri, comenzi, clienți și rata de conversie
- Selectarea perioadei: 7, 30, 90 sau 365 de zile
- Grafic pentru evoluția veniturilor
- Distribuția vânzărilor pe categorii
- Comenzi recente
- Produse performante
- Obiectiv lunar
- Date actualizate dinamic cu JavaScript

### 🛍️ Comenzi

- Listarea comenzilor
- Căutare după client sau ID comandă
- Filtrare după status
- Sortarea comenzilor
- Paginare
- Modal cu detaliile comenzii
- Export CSV

### 👥 Clienți

- Listarea clienților
- Căutare și filtrare
- Sortare după valoare, număr de comenzi sau activitate
- KPI-uri dedicate clienților
- Paginare
- Modal cu informații detaliate
- Export CSV

### 📦 Produse

- Catalog administrativ de produse
- Filtrare după categorie
- Filtrare după disponibilitatea stocului
- Căutare și sortare
- Indicator vizual pentru nivelul stocului
- Detectarea produselor cu stoc redus sau epuizat
- Modal cu detalii
- Export CSV

### 👨‍💻 Echipă

- Listarea membrilor echipei
- Status: Online, Ocupat sau Offline
- Filtrare după rol și status
- Căutare
- Sortare
- Indicator pentru performanță
- Paginare
- Modal cu detaliile membrului
- Export CSV

### 📊 Rapoarte

- Analiza veniturilor și comenzilor
- Selectarea perioadei analizate
- KPI-uri dinamice
- Evoluția veniturilor și comenzilor
- Vânzări pe categorii
- Distribuția metodelor de plată
- Performanță lunară
- Insight-uri comerciale
- Export raport CSV

### ⚙️ Setări

- Editarea profilului administratorului
- Selectarea temei Light / Dark
- Mod compact
- Preferințe pentru notificări
- Selectarea monedei
- Selectarea fusului orar
- Configurarea pragului pentru stoc redus
- Configurarea numărului de elemente pe pagină
- Salvarea preferințelor în LocalStorage
- Resetarea setărilor
- Sincronizarea profilului în dashboard

---

## 🔔 Sistem de notificări

Dashboard-ul include un sistem global de notificări.

Notificările pot semnala:

- comenzi noi;
- produse cu stoc redus;
- produse epuizate;
- clienți noi.

Starea notificărilor citite/necitite este salvată în **LocalStorage**, astfel încât aceasta este păstrată după reîncărcarea paginii.

---

## 🌙 Dark Mode

Dashboard-ul suportă atât temă luminoasă, cât și temă întunecată.

Tema selectată este salvată în **LocalStorage** și este păstrată între pagini și după refresh.

Graficele din secțiunea de rapoarte sunt adaptate vizual în funcție de tema selectată.

---

## 💾 Persistența datelor

Pentru simularea persistenței datelor în browser am utilizat **LocalStorage**.

Acesta este folosit pentru:

- tema dashboard-ului;
- setările utilizatorului;
- preferințele interfeței;
- profilul administratorului;
- starea notificărilor.

Acest proiect este o aplicație frontend demonstrativă și nu utilizează un backend sau o bază de date reală.

---

## 🧠 Concepte JavaScript utilizate

Proiectul pune în practică mai multe concepte importante de JavaScript:

- manipularea DOM-ului;
- event listeners;
- array methods (`map`, `filter`, `sort`, `reduce`);
- obiecte și array-uri;
- template literals;
- funcții reutilizabile;
- formatarea datelor cu `Intl.NumberFormat`;
- LocalStorage;
- JSON;
- validarea formularelor;
- căutare și filtrare;
- sortare;
- paginare;
- generarea dinamică a elementelor HTML;
- gestionarea modalelor;
- exportul datelor în CSV;
- sincronizarea datelor între mai multe pagini.

---

## 📉 Grafice și vizualizarea datelor

Pentru grafice am utilizat **Chart.js**.

Dashboard-ul include mai multe tipuri de vizualizări pentru:

- venituri;
- comenzi;
- categorii de produse;
- metode de plată;
- evoluția performanței.

Graficele sunt actualizate dinamic atunci când utilizatorul schimbă perioada analizată.

---

## 🛠️ Tehnologii utilizate

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **Chart.js**
- **Font Awesome**
- **LocalStorage**
- **Git**
- **GitHub**
- **Vercel**


## 📱 Responsive Design

Interfața este adaptată pentru mai multe dimensiuni de ecran.

Pe dispozitivele mobile, sidebar-ul devine un meniu care poate fi deschis și închis, iar tabelele, cardurile, formularele și graficele sunt adaptate pentru spațiul disponibil.

---

## 🚀 Rulare locală

Proiectul nu necesită instalarea unor dependențe prin npm.

Poate fi clonat folosind:

```bash
git clone https://github.com/FabianToma-WebDeveloper/dashboard-by-fabian.git
```

Apoi deschide proiectul și rulează `index.html` folosind un server local, de exemplu extensia **Live Server** din Visual Studio Code.

---

## 🎯 Scopul proiectului

Scopul acestui proiect este demonstrarea abilităților mele de **Frontend Development**, în special lucrul cu JavaScript fără framework.

Am urmărit să construiesc o interfață apropiată de un dashboard administrativ real și să implementez funcționalități precum filtrare, sortare, paginare, grafice, modale, persistența preferințelor și reutilizarea logicii între mai multe pagini.

Pentru proiectele dezvoltate cu React, puteți consulta și celelalte proiecte din portofoliul meu.

---

## 👨‍💻 Autor

**Fabian Toma**  
Junior Frontend Developer

Portofoliu:  
https://www.fabiandev.ro/
