import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import compression from "compression";
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const CONTACT_EMAIL = (process.env.CONTACT_EMAIL || process.env.VITE_CONTACT_EMAIL || "jodystory95@yahoo.com").trim();
const FROM_EMAIL = (process.env.FROM_EMAIL || process.env.VITE_FROM_EMAIL || 'Jody Story Bail Bonds <onboarding@resend.dev>').trim();

const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
}) : null;

const SYSTEM_PROMPT = `
You are the 24/7 AI Contact Assistant for "Jody Story Bail Bonds LLC".
Your purpose is to answer user questions about bail bonds, explain release processes, and help users get in touch with Jody Story and licensed bail bondsmen immediately.

Company Info:
- Company Name: Jody Story Bail Bonds LLC
- Service: 24/7 Missouri Bail Bond assistance & fast jail release
- Primary Phone: 573-854-9264 (Call or Text anytime 24/7)
- Email: jodystory95@yahoo.com
- Main Address: 102 North Mine St, Potosi, MO 63664
- Coverage: Over 20+ Missouri counties (Washington, Jefferson, St. Francois, St. Charles, Howell, Iron, Crawford, Dent, Madison, Butler, etc.)
- Values: Fast, Confidential, 24/7 Availability, Respectful Service

Key Guidelines & Rules:
1. Standard bail bond fee in Missouri is typically 10% of the total bail set by the court.
2. If the user needs immediate help posting bail for someone in custody, ask for:
   - Inmate's full name
   - County/Facility where they are held
   - A callback phone number where Jody or an agent can reach them.
3. Be reassuring, polite, clear, and empathetic. Families facing arrest situations are under stress.
4. IMPORTANT: You are an AI assistant for information and dispatch assistance; you are NOT a lawyer and CANNOT provide legal advice. Remind callers to speak with a licensed defense attorney for legal representation.
5. Emphasize that Jody Story Bail Bonds is available 24 hours a day, 7 days a week, 365 days a year at 573-854-9264.
6. Reassure users who share contact details that Jody Story receives an instant notification of their request.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Compress all text assets (JS, CSS, HTML, API responses)
  app.use(compression());

  // Enforce non-www URL canonical structure (301 redirect www. to bare domain)
  app.use((req, res, next) => {
    const host = req.headers.host || "";
    if (host.toLowerCase().startsWith("www.")) {
      const bareHost = host.substring(4);
      return res.redirect(301, `https://${bareHost}${req.originalUrl}`);
    }
    next();
  });

  // Enforce trailing slash canonicalization (301 redirect trailing-slashed GET requests to non-trailing slash, except root)
  app.use((req, res, next) => {
    if (req.method === "GET") {
      const urlPath = req.path;
      if (urlPath.endsWith("/") && urlPath.length > 1) {
        const cleanPath = urlPath.slice(0, -1);
        const query = req.url.slice(req.path.length);
        return res.redirect(301, `${cleanPath}${query}`);
      }
    }
    next();
  });

  // Enable global CORS headers so Googlebot, Bingbot, and AI scrapers can fetch fonts/assets cross-origin during rendering
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    // SEO: Add explicit X-Robots-Tag directive to encourage open web crawling
    res.setHeader("X-Robots-Tag", "index, follow");
    
    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // 301 Canonical Redirect for obsolete or non-existent URLs (e.g. /felony-bail-bonds) to prevent SEO duplicates
  const VALID_COUNTIES = new Set([
    'pettis', 'cooper', 'benton', 'hickory', 'dallas', 'polk', 'webster', 'st-charles', 'jefferson', 'washington', 'st-francois', 'ste-genevieve', 'madison', 'crawford', 'iron', 'reynolds', 'dent', 'wayne', 'howell', 'oregon', 'shannon', 'carter', 'ripley', 'butler', 'franklin'
  ]);

  const VALID_CITIES = new Set([
    'potosi', 'farmington', 'hillsboro', 'sedalia', 'poplar-bluff', 'west-plains', 'bolivar', 'festus', 'park-hills', 'marshfield', 'bonne-terre', 'ironton'
  ]);

  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return next();
    }

    const rawPath = req.path;
    const cleanPath = rawPath.toLowerCase().replace(/\/+$/, "") || "/";

    // Let static assets, API, and core development directories/files pass through untouched
    if (
      cleanPath.startsWith("/api/") ||
      cleanPath.startsWith("/assets/") ||
      cleanPath.startsWith("/@") ||
      cleanPath.startsWith("/src/") ||
      cleanPath.startsWith("/node_modules/") ||
      cleanPath === "/favicon.ico" ||
      cleanPath === "/robots.txt" ||
      cleanPath === "/sitemap.xml" ||
      cleanPath.endsWith(".txt") ||
      /\.[a-zA-Z0-9]{2,5}$/.test(cleanPath)
    ) {
      return next();
    }

    // Check if it's a valid front-end route
    if (cleanPath === "/service-area/city/bonne-terre") {
      return res.redirect(301, "/bonne-terre-mo-bail-bonds--24/7-jail-release-services");
    }
    if (cleanPath === "/service-area/city/ironton") {
      return res.redirect(301, "/ironton-bail-bonds-247-jail-release");
    }

    if (cleanPath === "/" || cleanPath === "/index.html" || cleanPath === "/felony-bail-bonds" || cleanPath === "/bonne-terre-mo-bail-bonds--24/7-jail-release-services" || cleanPath === "/ironton-bail-bonds-247-jail-release") {
      return next();
    }

    if (cleanPath.startsWith("/service-area/city/")) {
      const cityId = cleanPath.substring("/service-area/city/".length);
      if (VALID_CITIES.has(cityId)) {
        return next();
      }
    } else if (cleanPath.startsWith("/service-area/")) {
      const countyId = cleanPath.substring("/service-area/".length);
      if (VALID_COUNTIES.has(countyId)) {
        return next();
      }
    }

    // If path is invalid or obsolete (e.g., /felony-bail-bonds or old URLs), issue 301 Redirect to the homepage
    console.log(`Obsolete/invalid route requested: "${rawPath}". Redirecting 301 to "/" canonical site root.`);
    return res.redirect(301, "/");
  });

  app.use(express.json());

  // Contact form API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, phone, email, county, message, inmateName } = req.body;

      if (!resend) {
        console.log("No RESEND_API_KEY found. Logging message instead:");
         console.log({ name, phone, email, county, message, inmateName });
        return res.json({ success: true, demo: true, message: "Demo mode: Lead logged to server console." });
      }

      console.log(`Email submission received. Attempting to send using FROM_EMAIL=${FROM_EMAIL}`);
      console.log(`Targeting CONTACT_EMAIL=${CONTACT_EMAIL} and USER_EMAIL=${email}`);

      let adminSendError: any = null;
      let adminSendData: any = null;

      // 1. Send detailed inquiry notification to the company email (CONTACT_EMAIL)
      try {
        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: [CONTACT_EMAIL],
          replyTo: email,
          subject: `New Bail Bond Lead: ${name} (${county})`,
          html: `
            <div style="font-family: serif; padding: 30px; color: #111; border: 1px solid #ddd; background-color: #fcfcfc; max-width: 600px; margin: 0 auto; border-top: 4px solid #00D2FF;">
              <h2 style="color: #0b132b; font-style: italic; margin-bottom: 20px;">New Bond Inquiry Alert</h2>
              <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 20px;" />
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 150px;">Name:</td><td style="padding: 6px 0;">${name}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #00D2FF; text-decoration: none; font-weight: bold;">${phone}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #00D2FF; text-decoration: none;">${email}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">County of Arrest:</td><td style="padding: 6px 0;">${county}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Inmate Name:</td><td style="padding: 6px 0;">${inmateName || 'N/A'}</td></tr>
              </table>
              <h3 style="color: #0b132b; margin-top: 25px; margin-bottom: 10px; font-size: 15px;">Inquiry Message:</h3>
              <blockquote style="background: #f7f9fa; padding: 15px; border-left: 4px solid #00D2FF; font-style: italic; margin: 0;">
                ${message}
              </blockquote>
              <div style="margin-top: 30px; font-size: 11px; color: #888; text-align: center;">
                Generated securely from JodyStoryBailBonds.com • Available 24/7/365
              </div>
            </div>
          `,
        });

        if (error) {
          adminSendError = error;
          console.error("Failed to send lead alert to company email:", error);
        } else {
          adminSendData = data;
          console.log("Successfully sent lead alert to company email:", data);
        }
      } catch (err: any) {
        adminSendError = err;
        console.error("Exception during sending lead alert to company email:", err);
      }

      let clientSendError: any = null;
      let clientSendData: any = null;

      // 2. Also send a beautiful Confirmation Receipt directly to the user (email)
      try {
        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: [email],
          subject: `Request Received: Jody Story Bail Bonds LLC`,
          html: `
            <div style="font-family: serif; padding: 30px; color: #111; border: 1px solid #ddd; background-color: #fcfcfc; max-width: 600px; margin: 0 auto; border-top: 4px solid #00D2FF;">
              <h2 style="color: #0b132b; font-style: italic; margin-bottom: 20px;">We Have Received Your Inquiry</h2>
              <p style="font-size: 15px; line-height: 1.6; color: #333;">Dear ${name},</p>
              <p style="font-size: 15px; line-height: 1.6; color: #333;">
                Thank you for contacting Jody Story Bail Bonds LLC. An agent has been dispatched to review your request for custody release in <strong>${county}</strong>. We are standing by to guide you through every step of this process.
              </p>
              
              <div style="background-color: #f0fafc; padding: 20px; border: 1px solid #d0f0f5; border-radius: 4px; margin: 25px 0;">
                <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 16px; color: #0b132b;">Need Immediate Jail Information or Direct Update?</p>
                <p style="margin: 0; font-size: 15px; line-height: 1.6;">
                  For general updates and rapid processing, call us directly at any time: 
                  <br />
                  <a href="tel:5738549264" style="font-size: 18px; color: #00D2FF; font-weight: bold; text-decoration: none; display: inline-block; margin-top: 5px;">573-854-9264</a>
                </p>
              </div>

              <h3 style="color: #0b132b; margin-top: 25px; margin-bottom: 10px; font-size: 15px; border-b: 1px solid #eee; padding-bottom: 5px;">Summary of Details Transmitted:</h3>
              <table style="width: 100%; font-size: 13px; color: #555;">
                <tr><td style="padding: 4px 0; font-weight: bold; width: 150px;">Inmate Name:</td><td>${inmateName || 'N/A'}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Arrest Jurisdiction:</td><td>${county}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Your Contact Phone:</td><td>${phone}</td></tr>
              </table>

              <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;" />
              <p style="font-size: 12px; color: #777; line-height: 1.5; margin: 0;">
                <em>Disclaimer: This confirmation has been sent automatically to confirm your registration. Jody Story Bail Bonds LLC operates 24/7/365 to render discreet and professional bail surety throughout Missouri.</em>
              </p>
            </div>
          `,
        });

        if (error) {
          clientSendError = error;
          console.error("Failed to send receipt to client email:", error);
        } else {
          clientSendData = data;
          console.log("Successfully sent receipt to client email:", data);
        }
      } catch (err: any) {
        clientSendError = err;
        console.error("Exception during sending receipt to client email:", err);
      }

      // If both fully failed, return the error
      if (adminSendError && clientSendError) {
        const errMsg = `Admin Notify Error: ${adminSendError.message || JSON.stringify(adminSendError)}. Client Receipt Error: ${clientSendError.message || JSON.stringify(clientSendError)}`;
        console.error("Both email sending attempts failed:", errMsg);
        return res.status(400).json({ error: errMsg });
      }

      // If at least one succeeded (e.g. they got the receipt in their sandbox), we return success!
      res.status(200).json({ 
        success: true, 
        adminSent: !adminSendError, 
        clientSent: !clientSendError, 
        data: adminSendData || clientSendData 
      });
    } catch (err) {
      console.error("Server API error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!ai) {
        return res.status(200).json({ text: "Demo mode: AI features will be available once a GEMINI_API_KEY is configured. Please call us at 573-854-9264 for immediate assistance." });
      }

      // Convert history to contents format: [{ role, parts: [{ text }] }]
      const contents = [...history, { role: 'user', parts: [{ text: message }] }];

      // Send chat alert to Jody if contact details (phone, email, or request) are present
      if (resend) {
        const phoneRegex = /\b(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\b/;
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        const hasPhone = phoneRegex.test(message);
        const hasEmail = emailRegex.test(message);
        const isLead = hasPhone || hasEmail || /call\s+me|contact\s+me|my\s+number|reach\s+me|inmate|bail|jail|bond/i.test(message);

        if (isLead) {
          const phoneMatch = message.match(phoneRegex);
          const detectedPhone = phoneMatch ? phoneMatch[0] : "See transcript";

          resend.emails.send({
            from: FROM_EMAIL,
            to: [CONTACT_EMAIL],
            subject: `AI Chat Notification: Lead from Website (${detectedPhone !== "See transcript" ? detectedPhone : "New Chat Lead"})`,
            html: `
              <div style="font-family: serif; padding: 25px; color: #111; border: 1px solid #ddd; background-color: #fcfcfc; max-width: 600px; margin: 0 auto; border-top: 4px solid #00D2FF;">
                <h2 style="color: #0b132b; margin-bottom: 15px; font-style: italic;">AI Chat Lead Notification</h2>
                <p style="font-size: 14px; color: #333;">A visitor sent a request via the AI Chatbot on JodyStoryBailBonds.com:</p>
                
                <div style="background: #f0fafc; padding: 15px; border-left: 4px solid #00D2FF; margin: 15px 0;">
                  <p style="margin: 0 0 6px 0; font-weight: bold; font-size: 13px; color: #0b132b;">Latest Visitor Message:</p>
                  <p style="margin: 0; font-size: 15px; color: #111; font-style: italic;">"${message}"</p>
                </div>

                ${hasPhone ? `<p style="font-size: 16px; font-weight: bold; color: #00D2FF; margin: 15px 0;">Direct Phone Number: <a href="tel:${detectedPhone}" style="color: #00D2FF; text-decoration: underline;">${detectedPhone}</a></p>` : ''}

                <h3 style="color: #0b132b; margin-top: 20px; font-size: 14px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Recent Conversation Context:</h3>
                <div style="background: #f7f9fa; padding: 12px; border-radius: 4px; font-size: 12px; color: #444; max-height: 220px; overflow-y: auto; font-family: monospace;">
                  ${contents.slice(-6).map((c: any) => `<div style="margin-bottom: 8px;"><strong>${c.role === 'user' ? 'Visitor' : 'AI Assistant'}:</strong> ${c.parts?.[0]?.text || ''}</div>`).join('')}
                </div>

                <div style="margin-top: 25px; font-size: 11px; color: #888; text-align: center;">
                  Jody Story Bail Bonds LLC • Automated AI Chat Notification • Available 24/7/365
                </div>
              </div>
            `
          }).catch(e => console.error("Error sending AI chat notification to Jody:", e));
        }
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Chat API error:", err);
      const errorMessage = err?.message || String(err);
      
      if (
        errorMessage.includes("429") || 
        errorMessage.toLowerCase().includes("rate") || 
        errorMessage.toLowerCase().includes("quota") || 
        errorMessage.toLowerCase().includes("exhausted") ||
        errorMessage.toLowerCase().includes("limit")
      ) {
        return res.json({
          text: "Please accept our apologies: our automated chat assistant is currently experiencing heavy request volume. For fast, confidential 24/7 assistance with any bail bond, please call Jody Story Bail Bonds directly at 573-854-9264—we are standing by to help you immediately."
        });
      }
      
      return res.json({
        text: "Our AI assistant is temporarily offline. For immediate, direct assistance with fast, confidential Missouri bail bonds, please call us 24/7 at 573-854-9264."
      });
    }
  });

  // IndexNow API: Get information regarding current IndexNow configuration
  app.get("/api/indexnow/info", async (req, res) => {
    try {
      const defaultKey = "j6d7dnc3kqjx9eqpf5j58ceve38dwbj1";
      const key = (process.env.INDEXNOW_KEY || defaultKey).trim();
      const host = "jstorybailbonds.com";
      const keyLocation = `https://${host}/${key}.txt`;

      let urls: string[] = [];
      try {
        const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
        const xmlContent = fs.readFileSync(sitemapPath, "utf-8");
        const urlMatches = xmlContent.match(/<loc>(https:\/\/jstorybailbonds\.com\/[^<]+)<\/loc>/g) || [];
        urls = urlMatches.map(m => m.replace(/<\/?loc>/g, "").trim());
      } catch (e) {
        console.error("Error reading sitemap for IndexNow:", e);
      }

      res.json({
        success: true,
        key,
        host,
        keyLocation,
        totalUrls: urls.length,
        sampleUrls: urls.slice(0, 5),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to load IndexNow info" });
    }
  });

  // IndexNow API: Submit URLs to IndexNow search engines
  app.post("/api/indexnow/submit", async (req, res) => {
    try {
      const defaultKey = "j6d7dnc3kqjx9eqpf5j58ceve38dwbj1";
      const key = (process.env.INDEXNOW_KEY || defaultKey).trim();
      const host = "jstorybailbonds.com";
      const keyLocation = `https://${host}/${key}.txt`;

      const { customUrls } = req.body;
      let urlsToSubmit: string[] = [];

      if (customUrls && Array.isArray(customUrls) && customUrls.length > 0) {
        urlsToSubmit = customUrls.map(u => u.trim());
      } else {
        const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
        const xmlContent = fs.readFileSync(sitemapPath, "utf-8");
        const urlMatches = xmlContent.match(/<loc>(https:\/\/jstorybailbonds\.com\/[^<]+)<\/loc>/g) || [];
        urlsToSubmit = urlMatches.map(m => m.replace(/<\/?loc>/g, "").trim());
      }

      if (urlsToSubmit.length === 0) {
        return res.status(400).json({ error: "No URLs found to submit" });
      }

      const payload = {
        host,
        key,
        keyLocation,
        urlList: urlsToSubmit,
      };

      console.log(`Submitting ${urlsToSubmit.length} URLs to IndexNow search engines via key ${key}...`);

      const searchEngines = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow",
        "https://search.yandex.com/indexnow"
      ];

      const results = [];
      for (const engine of searchEngines) {
        try {
          const response = await fetch(engine, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(payload),
          });

          results.push({
            engine,
            status: response.status,
            statusText: response.statusText,
            success: response.status === 200 || response.status === 202,
          });
        } catch (engineError: any) {
          results.push({
            engine,
            success: false,
            error: engineError.message || "Network request failed",
          });
        }
      }

      res.json({
        success: results.some(r => r.success),
        submittedCount: urlsToSubmit.length,
        results,
      });
    } catch (err: any) {
      console.error("Error submitting to IndexNow:", err);
      res.status(500).json({ error: err.message || "Internal server error during IndexNow submission" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Enable long-term aggressive browser caching for compiled static assets (JS, CSS, images with hashes)
    app.use('/assets', express.static(path.join(distPath, 'assets'), {
      maxAge: '1y',
      immutable: true,
      index: false
    }));

    // For other static files (favicon, sitemap, robots.txt, etc.) use a shorter cache
    app.use(express.static(distPath, {
      maxAge: '1d',
      index: false
    }));

    app.get('*', (req, res) => {
      // Serve index.html with no-cache headers to ensure users always receive the latest release
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Content-Type", "text/html");
      try {
        let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
        
        // Inject a dynamic canonical tag to prevent SPA indexing issues and 'Alternate page with proper canonical tag' errors
        const canonicalUrl = `https://jstorybailbonds.com${req.path}`;
        const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" data-static="true" />`;
        
        // Replace the default title and inject canonical
        html = html.replace('</head>', `  ${canonicalTag}\n  </head>`);
        
        res.send(html);
      } catch (e) {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
