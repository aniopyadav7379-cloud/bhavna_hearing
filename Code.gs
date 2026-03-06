// =============================================================
//  BHAVANA HEARING & VERTIGO CLINIC — Google Apps Script
//
//  HOW TO SET UP:
//  1. Open your Google Sheet
//  2. Click  Extensions > Apps Script
//  3. Delete everything and paste this entire file
//  4. Click  Deploy > New deployment
//  5. Type: Web App
//  6. Execute as: Me
//     Who has access: Anyone
//  7. Click Deploy → copy the Web App URL
//  8. Open shared.js → find SHEET_URL → paste your URL there
//  9. Save and re-upload shared.js to your website
//
//  TO TEST: Open the Web App URL in your browser
//  You should see:  { "status": "ok", "message": "Bhavana Sheet API running ✅" }
// =============================================================

// ── Sheet tab names (do NOT change unless you rename the tabs) ──
var APPT_SHEET    = "Appointments";
var ENQUIRY_SHEET = "Hearing Aid Enquiries";

// =============================================================
//  RECEIVE POST REQUEST  (called by your website automatically)
// =============================================================
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.type === "appointment") {
      saveAppointment(data);
    } else if (data.type === "enquiry") {
      saveEnquiry(data);
    }

    return ok("Saved ✅");
  } catch (err) {
    return ok("Error: " + err.message);
  }
}

// Test URL in browser → should show { status:"ok" }
function doGet() {
  return ok("Bhavana Sheet API running ✅");
}

// =============================================================
//  SAVE APPOINTMENT → "Appointments" sheet
//  Columns: Timestamp | Name | Phone | Email | Age |
//           Service | Branch | Date | Type | Notes | Status
// =============================================================
function saveAppointment(d) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(APPT_SHEET);

  // Auto-create sheet with header row if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(APPT_SHEET);
    var hdr = sheet.getRange(1, 1, 1, 11);
    hdr.setValues([[
      "Timestamp", "Name", "Phone", "Email", "Age",
      "Service", "Branch", "Preferred Date", "Visit Type", "Notes", "Status"
    ]]);
    hdr.setBackground("#e8622a");
    hdr.setFontColor("#ffffff");
    hdr.setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, 11, 160);
    sheet.setColumnWidth(10, 280);
  }

  // Add new row
  sheet.appendRow([
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    d.name     || "",
    d.phone    || "",
    d.email    || "",
    d.age      || "",
    d.service  || "",
    d.branch   || "",
    d.date     || "Flexible",
    d.apptType  || d.type || "Clinic Visit",
    d.notes    || "",
    "🆕 New"     // ← Change this to ✅ Confirmed once you call the patient
  ]);

  // Highlight new row yellow so it stands out
  var row = sheet.getLastRow();
  sheet.getRange(row, 1, 1, 11).setBackground("#fff9c4");
}

// =============================================================
//  SAVE HEARING AID ENQUIRY → "Hearing Aid Enquiries" sheet
//  Columns: Timestamp | Customer Name | Phone | Email |
//           Branch | Products Enquired | Notes | Status
// =============================================================
function saveEnquiry(d) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(ENQUIRY_SHEET);

  // Auto-create sheet with header row if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(ENQUIRY_SHEET);
    var hdr = sheet.getRange(1, 1, 1, 8);
    hdr.setValues([[
      "Timestamp", "Customer Name", "Phone", "Email",
      "Branch", "Products Enquired", "Notes", "Status"
    ]]);
    hdr.setBackground("#00766c");
    hdr.setFontColor("#ffffff");
    hdr.setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 180);
    sheet.setColumnWidth(3, 150);
    sheet.setColumnWidth(4, 200);
    sheet.setColumnWidth(5, 220);
    sheet.setColumnWidth(6, 320); // Products - wider
    sheet.setColumnWidth(7, 260); // Notes - wider
    sheet.setColumnWidth(8, 130);
  }

  // Build a readable list of products the customer asked about
  // NOTE: item.p may arrive as a string "₹72,000" (from shop.html)
  //       or as a number 72000 (from other pages) — handle both
  var items   = d.items || [];
  var prodList = items.map(function(item) {
    var price = item.p || "";
    // If price is a number, format it with ₹ symbol
    if (typeof price === "number") {
      price = "₹" + price.toLocaleString("en-IN");
    }
    // If price is already a string (e.g. "₹72,000"), use it directly
    var emi = item.emi ? " · EMI " + item.emi : "";
    return item.name + " (" + (item.brand || "") + ") " + price + emi;
  }).join("\n");

  // Save ONE row per enquiry (all products in one cell)
  sheet.appendRow([
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    d.name   || "",
    d.phone  || "",
    d.email  || "",
    d.branch || "",
    prodList || "(no products listed)",
    d.notes  || "",
    "🆕 New"   // ← Change to ✅ Called / 🔄 Follow-up
  ]);

  // Highlight new enquiry green so it stands out
  var row = sheet.getLastRow();
  sheet.getRange(row, 1, 1, 8).setBackground("#e8f5e9");
}

// =============================================================
//  HELPER — returns JSON response
// =============================================================
function ok(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}
