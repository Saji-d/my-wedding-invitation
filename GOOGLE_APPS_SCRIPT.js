/**
 * Google Apps Script for Wedding RSVP and Guest Wishes
 * 
 * Instructions:
 * 1. Create a new Google Sheet.
 * 2. Rename the first sheet to 'Submissions'.
 * 3. Add headers in Row 1: Timestamp, Name, Phone Number, Attendance Status, Wish Message, Source
 * 4. Go to Extensions > Apps Script.
 * 5. Replace the code with this file's content.
 * 6. Update NOTIFICATION_EMAIL below.
 * 7. Deploy > New Deployment > Web App.
 * 8. Set Execute as: Me.
 * 9. Set Who has access: Anyone.
 * 10. Copy the Web App URL and paste it into src/config/wedding.ts or .env.local as NEXT_PUBLIC_GOOGLE_SHEET_URL.
 */

const NOTIFICATION_EMAIL = "sajidsajidurrahman99@gmail.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Submissions');
    
    const timestamp = new Date();
    const name = data.name || "";
    const phone = data.phone || "";
    const status = data.status || "";
    const message = data.message || "";
    const source = data.source || "";

    // Append to sheet
    sheet.appendRow([timestamp, name, phone, status, message, source]);

    // Send Email Notification
    if (source === "RSVP") {
      sendRSVPEmail(name, phone, status, timestamp);
    } else if (source === "Guest Wish") {
      sendWishEmail(name, message, timestamp);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendRSVPEmail(name, phone, status, timestamp) {
  const subject = `New Wedding RSVP - ${name}`;
  const body = `
Guest Name: ${name}
Phone Number: ${phone}
Status: ${status}
Time: ${timestamp.toLocaleString()}
  `;
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

function sendWishEmail(name, message, timestamp) {
  const subject = `New Wedding Wish - ${name}`;
  const body = `
Guest Name: ${name}

Message:
${message}

Time:
${timestamp.toLocaleString()}
  `;
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}
