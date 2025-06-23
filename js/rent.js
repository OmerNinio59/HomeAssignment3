/**
 * פונקציית עזר לבדיקת חפיפה בין שני טווחי תאריכים.
 * מחזירה true אם יש חפיפה, false אם אין.
 * @param {string} start1 - תאריך התחלה של הטווח הראשון (בפורמט 'YYYY-MM-DD')
 * @param {string} end1 - תאריך סיום של הטווח הראשון (בפורמט 'YYYY-MM-DD')
 * @param {string} start2 - תאריך התחלה של הטווח השני (בפורמט 'YYYY-MM-DD')
 * @param {string} end2 - תאריך סיום של הטווח השני (בפורמט 'YYYY-MM-DD')
 * @returns {boolean} - האם יש חפיפה בין הטווחים
 */

function isDateRangeOverlap(start1, end1, start2, end2) {
  return !(end1 < start2 || start1 > end2);
}

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

function checkAvailability(listingId, startDate, endDate) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.endsWith('_bookings')) {
      const bookings = JSON.parse(localStorage.getItem(key));

      for (const booking of bookings) {
        if (booking.listingId === listingId) {
          const overlap = isDateRangeOverlap(
            startDate,
            endDate,
            booking.startDate,
           booking.endDate
          );
          if (overlap) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");
const listing = amsterdam.find(item => item.listing_id == listingId);

if (!listing) {
  document.querySelector(".main-section").innerHTML = "<p>Listing not found.</p>";
} else {
  const listingDetails = document.getElementById("listingDetails");
  listingDetails.innerHTML = `
    <img class="listing-image" src="${listing.picture_url}" alt="${listing.name}" />
    <p>${listing.description || "No description available."}</p>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  const availabilityResult = document.getElementById("availabilityResult");
  const paymentWrapper = document.getElementById("paymentWrapper");
  const dateForm = document.getElementById("dateForm");

  if (paymentWrapper) {
    paymentWrapper.classList.add("hidden");
  }

  dateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
      availabilityResult.textContent = "Please select both start and end dates.";
      availabilityResult.style.color = "red";
      return;
    }

    const available = checkAvailability(listingId, startDate, endDate);

    if (available) {
      const username = localStorage.getItem("loggedInUser");
      if (username) {
        const key = username + "_bookings";
        const newBooking = {
          listingId,
          startDate,
          endDate
        };

        const existing = JSON.parse(localStorage.getItem(key)) || [];

        const isDuplicate = existing.some(b =>
          b.listingId === listingId &&
          b.startDate === startDate &&
          b.endDate === endDate
        );

        if (isDuplicate) {
          availabilityResult.textContent = "You already booked this apartment on these dates.";
          availabilityResult.style.color = "orange";
          paymentWrapper.classList.remove("hidden");
          return;
        }

        existing.push(newBooking);
        localStorage.setItem(key, JSON.stringify(existing));
      }

      availabilityResult.textContent = "Dates are available. You can now complete the payment.";
      availabilityResult.style.color = "green";
      paymentWrapper.classList.remove("hidden");
    } else {
      availabilityResult.textContent = "This apartment is already booked on these dates.";
      availabilityResult.style.color = "red";
      paymentWrapper.classList.add("hidden");
    }
  });
});
