export interface GoogleSheetSubmission {
  name: string;
  phone?: string;
  status?: string;
  message?: string;
  source: "RSVP" | "Guest Wish";
}

export async function submitToGoogleSheets(data: GoogleSheetSubmission) {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL || "";
  
  if (!url) {
    console.error("Google Sheet URL is not defined. Please set NEXT_PUBLIC_GOOGLE_SHEET_URL in your environment variables.");
    throw new Error("Configuration error");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors", // Google Apps Script requires no-cors or specialized handling
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // With no-cors, we can't read the response body, 
    // but the request will be sent to the script.
    return { success: true };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    throw error;
  }
}
