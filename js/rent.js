/**
 * פונקציית עזר לבדיקת חפיפה בין שני טווחי תאריכים.
 * מחזירה true אם יש חפיפה, false אם אין.
 * @param {string} start1 - תאריך התחלה של הטווח הראשון (בפורמט 'YYYY-MM-DD')
 * @param {string} end1 - תאריך סיום של הטווח הראשון (בפורמט 'YYYY-MM-DD')
 * @param {string} start2 - תאריך התחלה של הטווח השני (בפורמט 'YYYY-MM-DD')
 * @param {string} end2 - תאריך סיום של הטווח השני (בפורמט 'YYYY-MM-DD')
 * @returns {boolean} - האם יש חפיפה בין הטווחים
 */


/**
 * בודק האם הטווח שהתבקש פנוי להשכרה בדירה מסוימת.
 * יש לממש את החלק של קריאת ההזמנות ב-localStorage והבדיקה בעזרת isDateRangeOverlap.
 * @param {string} listingId - מזהה הדירה
 * @param {string} startDate - תאריך התחלה שנבחר להשכרה
 * @param {string} endDate - תאריך סיום שנבחר להשכרה
 * @returns {boolean} - true אם הזמנים פנויים, false אם יש חפיפה
 */


 // TODO: לולאה על כל מפתחות ה-localStorage של המשתמשים
  // רמז - key.endsWith('_bookings')
  //      - קריאה לנתוני ההזמנות שלהם
  //      - חיפוש הזמנות עם listingId זה
  //      - שימוש ב-isDateRangeOverlap להשוואה בין טווחים
  // להחזיר false אם יש חפיפה, true אם פנוי



function isDateRangeOverlap(start1, end1, start2, end2) {
  return !(end1 < start2 || start1 > end2);
}

function checkAvailability(listingId, startDate, endDate) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.endsWith('_bookings')) {
      const bookings = JSON.parse(localStorage.getItem(key));
      for (const booking of bookings) {
        if (booking.listingId === listingId) {
          if (isDateRangeOverlap(startDate, endDate, booking.startDate, booking.endDate)) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const section = document.createElement("section");
  section.className = "intro-grid";

  const container = document.createElement("div");
  container.className = "intro-text";

  const title = document.createElement("h1");
  title.textContent = "Rent";

  const layout = document.createElement("div");
  layout.className = "rent-layout"; // יוגדר ב־CSS

  const leftPanel = document.createElement("div");
  leftPanel.className = "left-panel";

  const rightPanel = document.createElement("div");
  rightPanel.className = "right-panel";

  container.appendChild(title);
  container.appendChild(layout);
  section.appendChild(container);
  main.appendChild(section);

  // שליפת פרטי הדירה
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get("id");
  const listing = amsterdam.find(item => item.listing_id == listingId);
  if (!listing) {
    leftPanel.innerHTML = "<p>You should choose an apartment first(;.</p>";
    layout.appendChild(leftPanel);
    return;
  }

  // קוביית הדירה (תמונה + תיאור)
  const card = document.createElement("div");
  card.className = "listing-card";
  card.innerHTML = `
    <img class="listing-image" src="${listing.picture_url}" alt="${listing.name}" />
    <div class="listing-info">
      <h2>${listing.name}</h2>
      <p>${listing.description || "No description available."}</p>
    </div>
  `;
  leftPanel.appendChild(card);

  // טופס תאריכים
  const dateForm = document.createElement("form");
  dateForm.id = "dateForm";
  dateForm.innerHTML = `
    <h3>Select Your Stay</h3>
    <label for="startDate">Start Date:</label>
    <input type="date" id="startDate" required />
    <label for="endDate">End Date:</label>
    <input type="date" id="endDate" required />
    <div id="availabilityResult"></div>
    <button type="submit">Check Availability</button>
  `;
  const dateFormWrapper = document.createElement("div");
  dateFormWrapper.className = "date-picker";
  dateFormWrapper.appendChild(dateForm);

  // טופס תשלום
  const paymentWrapper = document.createElement("div");
  paymentWrapper.id = "paymentWrapper";
  paymentWrapper.className = "payment-form hidden";
  paymentWrapper.innerHTML = `
    <form id="payment">
      <h3>Payment Details</h3>
      <label for="fullName">Full Name:</label>
      <input type="text" id="fullName" required />
      <label for="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" maxlength="16" required />
      <label for="expiry">Expiration Date:</label>
      <input type="month" id="expiry" required />
      <label for="cvv">CVV:</label>
      <input type="text" id="cvv" maxlength="3" required />
      <button type="submit">PAY</button>
    </form>
  `;

  // שילוב בלייאאוט
  layout.appendChild(leftPanel);
  rightPanel.appendChild(dateFormWrapper);
  rightPanel.appendChild(paymentWrapper);
  layout.appendChild(rightPanel);

  // לוגיקה: טופס תאריכים
  const availabilityResultEl = dateForm.querySelector("#availabilityResult");

  dateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
      availabilityResultEl.textContent = "Please select both start and end dates.";
      availabilityResultEl.style.color = "red";
      paymentWrapper.classList.add("hidden");
      return;
    }

    const available = checkAvailability(listingId, startDate, endDate);

    if (available) {
      // const username = localStorage.getItem("currentUser") || localStorage.getItem("loggedInUser");
      const username = localStorage.getItem("currentUser");
      if (username) {
        const key = username + "_bookings";
        const newBooking = { listingId, startDate, endDate };
        const existing = JSON.parse(localStorage.getItem(key)) || [];

        const isDuplicate = existing.some(b =>
          b.listingId === listingId &&
          b.startDate === startDate &&
          b.endDate === endDate
        );

        if (isDuplicate) {
          availabilityResultEl.textContent = "You already booked this apartment on these dates.";
          availabilityResultEl.style.color = "orange";
          paymentWrapper.classList.remove("hidden");
          return;
        }

        existing.push(newBooking);
        localStorage.setItem(key, JSON.stringify(existing));
      }

      availabilityResultEl.textContent = "Dates are available. You can now complete the payment.";
      availabilityResultEl.style.color = "green";
      paymentWrapper.classList.remove("hidden");
    } else {
      availabilityResultEl.textContent = "This apartment is already booked on these dates.";
      availabilityResultEl.style.color = "red";
      paymentWrapper.classList.add("hidden");
    }
  });

  // לוגיקה: תשלום
  document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "payment") {
      e.preventDefault();
      availabilityResultEl.textContent = "Payment successful! Redirecting to My Bookings...";
      availabilityResultEl.style.color = "green";
      setTimeout(() => {
        window.location.href = "mybookings.html";
      }, 2000);
    }
  });
});