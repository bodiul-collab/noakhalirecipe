import { Recipe } from "../types";
import { calculateNutritionForPortion } from "./nutritionEstimator";

export interface PrintOptions {
  multiplier?: number;
  includeImage?: boolean;
  includeNutrition?: boolean;
  includeChefNotes?: boolean;
  includeHalalNotes?: boolean;
  fontSize?: "compact" | "normal" | "large";
}

/**
 * Generates a clean, standalone, self-contained HTML document
 * that is ready to print, view in a new tab, or save as PDF.
 */
export function generatePrintableHtml(
  recipe: Recipe,
  options: PrintOptions = {}
): string {
  const {
    multiplier = 1.0,
    includeImage = true,
    includeNutrition = true,
    includeChefNotes = true,
    includeHalalNotes = true,
    fontSize = "normal",
  } = options;

  const nutrition = calculateNutritionForPortion(recipe, multiplier);
  const scaledServings = Math.round(recipe.servings * multiplier);

  const scaleAmount = (amountStr: string, mult: number): string => {
    const num = parseFloat(amountStr);
    if (isNaN(num)) return amountStr;
    const scaled = num * mult;
    return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
  };

  const baseFontSize =
    fontSize === "compact" ? "12px" : fontSize === "large" ? "15px" : "13.5px";
  const bodyLineHeight = fontSize === "compact" ? "1.4" : "1.5";

  const ingredientsListHtml = recipe.ingredients
    .map((ing) => {
      const displayAmount = scaleAmount(ing.amount, multiplier);
      return `
        <li style="display: flex; align-items: baseline; gap: 8px; padding: 4px 0; border-bottom: 1px dotted #E0DCD5;">
          <span style="display: inline-block; width: 14px; height: 14px; border: 1.5px solid #8A857E; border-radius: 3px; flex-shrink: 0; margin-top: 2px;"></span>
          <span style="font-weight: 700; color: #242423; min-width: 60px;">${displayAmount} ${ing.unit || ""}</span>
          <span style="color: #30302F;">${ing.name}${ing.notes ? ` <em style="color: #77736D; font-size: 0.9em;">(${ing.notes})</em>` : ""}</span>
        </li>
      `;
    })
    .join("");

  const instructionsHtml = recipe.instructions
    .map((inst) => {
      return `
        <div style="margin-bottom: 14px; page-break-inside: avoid; border-left: 3px solid #E97520; padding-left: 12px;">
          <div style="font-size: 0.85em; font-weight: 700; color: #E97520; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">
            Step ${inst.step}: ${inst.title}
          </div>
          <p style="margin: 0; color: #30302F; line-height: 1.5;">${inst.instruction}</p>
          ${
            includeChefNotes && inst.tip
              ? `<div style="margin-top: 6px; font-size: 0.85em; background: #FFF9F0; border: 1px solid #F8CD78; border-radius: 4px; padding: 6px 10px; color: #8A4F1D;">
                  <strong>Chef's Tip:</strong> ${inst.tip}
                </div>`
              : ""
          }
        </div>
      `;
    })
    .join("");

  const nutritionSectionHtml = includeNutrition
    ? `
      <section style="page-break-inside: avoid; margin-top: 22px; padding: 14px; background: #FAF9F6; border: 1px solid #E0DCD5; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #242423; padding-bottom: 6px; margin-bottom: 10px;">
          <h3 style="margin: 0; font-family: Georgia, serif; font-size: 1.2em; color: #242423;">
            Nutritional Facts &amp; Breakdown
          </h3>
          <span style="font-size: 0.8em; color: #77736D;">
            Per ${nutrition.portionLabel} (${scaledServings} servings yield)
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 12px; text-align: center;">
          <div style="background: white; border: 1px solid #E0DCD5; border-radius: 6px; padding: 8px 4px;">
            <div style="font-size: 0.7em; text-transform: uppercase; color: #77736D; font-weight: 700;">Calories</div>
            <div style="font-size: 1.3em; font-weight: 800; color: #E97520;">${nutrition.calories}</div>
            <div style="font-size: 0.7em; color: #8A857E;">${nutrition.dailyValuePercentages.calories}% DV</div>
          </div>
          <div style="background: white; border: 1px solid #E0DCD5; border-radius: 6px; padding: 8px 4px;">
            <div style="font-size: 0.7em; text-transform: uppercase; color: #77736D; font-weight: 700;">Protein</div>
            <div style="font-size: 1.3em; font-weight: 800; color: #242423;">${nutrition.proteinGrams}g</div>
            <div style="font-size: 0.7em; color: #8A857E;">${nutrition.macroRatios.proteinPercent}% cals</div>
          </div>
          <div style="background: white; border: 1px solid #E0DCD5; border-radius: 6px; padding: 8px 4px;">
            <div style="font-size: 0.7em; text-transform: uppercase; color: #77736D; font-weight: 700;">Carbs</div>
            <div style="font-size: 1.3em; font-weight: 800; color: #242423;">${nutrition.carbsGrams}g</div>
            <div style="font-size: 0.7em; color: #8A857E;">${nutrition.macroRatios.carbsPercent}% cals</div>
          </div>
          <div style="background: white; border: 1px solid #E0DCD5; border-radius: 6px; padding: 8px 4px;">
            <div style="font-size: 0.7em; text-transform: uppercase; color: #77736D; font-weight: 700;">Total Fat</div>
            <div style="font-size: 1.3em; font-weight: 800; color: #242423;">${nutrition.fatGrams}g</div>
            <div style="font-size: 0.7em; color: #8A857E;">${nutrition.macroRatios.fatPercent}% cals</div>
          </div>
        </div>

        <div style="font-size: 0.8em; color: #555; display: flex; justify-content: space-between; border-top: 1px solid #E0DCD5; padding-top: 6px;">
          <span><strong>Dietary Fiber:</strong> ${nutrition.fiberGrams}g (${nutrition.dailyValuePercentages.fiber}% DV)</span>
          <span><strong>Sodium:</strong> ${nutrition.sodiumMg}mg (${nutrition.dailyValuePercentages.sodium}% DV)</span>
          <span><strong>Diet Basis:</strong> 2,000 kcal standard</span>
        </div>

        <!-- Ingredient Calorie Contribution Summary -->
        <div style="margin-top: 10px; font-size: 0.78em;">
          <div style="font-weight: 700; color: #30302F; margin-bottom: 4px;">Ingredient Caloric Contribution:</div>
          <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #E0DCD5; font-size: 0.95em;">
            <thead>
              <tr style="background: #F3F2EE; text-align: left; color: #666;">
                <th style="padding: 4px 6px; border-bottom: 1px solid #E0DCD5;">Ingredient</th>
                <th style="padding: 4px 6px; border-bottom: 1px solid #E0DCD5; text-align: right;">Est. Cals</th>
                <th style="padding: 4px 6px; border-bottom: 1px solid #E0DCD5; text-align: right;">% Meal</th>
                <th style="padding: 4px 6px; border-bottom: 1px solid #E0DCD5; text-align: right;">P / C / F</th>
              </tr>
            </thead>
            <tbody>
              ${nutrition.ingredientBreakdown
                .slice(0, 8)
                .map(
                  (item) => `
                  <tr style="border-bottom: 1px solid #F0ECE6;">
                    <td style="padding: 3px 6px;">${item.name}</td>
                    <td style="padding: 3px 6px; text-align: right; font-weight: 700;">${item.estimatedCalories} kcal</td>
                    <td style="padding: 3px 6px; text-align: right; color: #777;">${item.percentageOfTotal}%</td>
                    <td style="padding: 3px 6px; text-align: right; color: #555;">${item.proteinGrams}g / ${item.carbsGrams}g / ${item.fatGrams}g</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    `
    : "";

  const halalNotesHtml = includeHalalNotes
    ? `
      <div style="page-break-inside: avoid; margin-top: 18px; padding: 10px 14px; background: #F4FAF6; border: 1px solid #A3D4BA; border-radius: 6px; font-size: 0.82em; color: #1E5C3B;">
        <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; margin-bottom: 2px;">
          <span>✓ Authentic Halal Kitchen Guarantee</span>
        </div>
        <p style="margin: 0; line-height: 1.4;">
          This recipe is 100% pork-free, bacon-free, and contains zero wine or alcohol deglazing. Ensure all meat and poultry are certified Zabiha/Halal from reputable suppliers.
        </p>
        ${
          recipe.halalNotes
            ? `<p style="margin: 6px 0 0 0; font-size: 0.95em; color: #15472E;">
                <strong>Halal Sourcing Note:</strong> ${
                  Array.isArray(recipe.halalNotes)
                    ? (recipe.halalNotes as string[]).join(" ")
                    : recipe.halalNotes
                }
              </p>`
            : ""
        }
      </div>
    `
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${recipe.title} — Halal Recipe Print | Noakhali Kitchen</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @page {
      margin: 12mm 12mm;
      size: portrait;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: ${baseFontSize};
      line-height: ${bodyLineHeight};
      color: #242423;
      background: #FAF9F6;
      margin: 0;
      padding: 20px;
    }
    .print-container {
      max-width: 800px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 36px 40px;
      border: 1px solid #E6E1D8;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }
    .floating-toolbar {
      max-width: 800px;
      margin: 0 auto 16px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 18px;
      background: #242423;
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .toolbar-btn {
      background: #E97520;
      color: white;
      border: none;
      padding: 8px 18px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s ease;
    }
    .toolbar-btn:hover {
      background: #D75D17;
    }
    .toolbar-btn-secondary {
      background: rgba(255,255,255,0.15);
      color: white;
      border: 1px solid rgba(255,255,255,0.25);
    }
    .toolbar-btn-secondary:hover {
      background: rgba(255,255,255,0.25);
    }
    @media print {
      body {
        background: #FFFFFF !important;
        padding: 0 !important;
      }
      .print-container {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        max-width: 100% !important;
      }
      .floating-toolbar {
        display: none !important;
      }
    }
  </style>
</head>
<body>

  <!-- Floating Print Controls Toolbar (Hidden in Print) -->
  <div class="floating-toolbar">
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 18px;">🖨️</span>
      <div>
        <strong style="display: block; font-size: 14px;">Print-Ready Halal Recipe</strong>
        <span style="font-size: 11px; opacity: 0.8;">Noakhali Kitchen &bull; ${recipe.title}</span>
      </div>
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="toolbar-btn" onclick="window.print();">
        Print / Save to PDF
      </button>
      <button class="toolbar-btn toolbar-btn-secondary" onclick="window.close();">
        Close Window
      </button>
    </div>
  </div>

  <!-- Printable Document Sheet -->
  <main class="print-container">
    <!-- Header -->
    <header style="border-bottom: 2px solid #242423; padding-bottom: 14px; margin-bottom: 18px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
        <span style="font-family: Georgia, serif; font-size: 1.1em; font-weight: 700; color: #242423; letter-spacing: 0.5px;">
          NOAKHALI KITCHEN
        </span>
        <span style="display: inline-block; background: #E8F5E9; color: #2D7A52; border: 1px solid #2D7A52; padding: 2px 8px; border-radius: 4px; font-size: 0.72em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          100% Halal Verified
        </span>
      </div>

      <h1 style="font-family: Georgia, serif; font-size: 2em; line-height: 1.2; margin: 6px 0 8px 0; color: #242423;">
        ${recipe.title}
      </h1>

      <p style="margin: 0 0 12px 0; color: #555; font-size: 0.95em; line-height: 1.4;">
        ${recipe.description}
      </p>

      <!-- Meta info bar -->
      <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.85em; color: #555; background: #FAF9F6; padding: 8px 12px; border-radius: 6px; border: 1px solid #E6E1D8;">
        <div><strong>Prep:</strong> ${recipe.prepTimeMinutes} mins</div>
        <div><strong>Cook:</strong> ${recipe.cookTimeMinutes} mins</div>
        <div><strong>Total:</strong> ${recipe.totalTimeMinutes} mins</div>
        <div><strong>Servings:</strong> ${scaledServings} (${nutrition.portionLabel})</div>
        <div><strong>Cuisine:</strong> ${recipe.cuisine}</div>
        <div><strong>Developer:</strong> ${recipe.author.name}</div>
      </div>
    </header>

    ${
      includeImage && recipe.heroImage
        ? `<div style="margin-bottom: 20px; max-height: 220px; overflow: hidden; border-radius: 6px; border: 1px solid #E0DCD5;">
            <img src="${recipe.heroImage}" alt="${recipe.title}" style="width: 100%; height: 220px; object-fit: cover;" referrerpolicy="no-referrer" />
          </div>`
        : ""
    }

    <!-- Two-column grid: Ingredients & Directions -->
    <div style="display: grid; grid-template-columns: 38% 58%; gap: 4%; margin-bottom: 20px;">
      <!-- Column 1: Ingredients -->
      <section>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #242423; padding-bottom: 4px; margin-bottom: 10px;">
          <h2 style="font-family: Georgia, serif; font-size: 1.25em; margin: 0; color: #242423;">
            Ingredients
          </h2>
          <span style="font-size: 0.75em; color: #777;">Yield: ${scaledServings}</span>
        </div>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${ingredientsListHtml}
        </ul>
      </section>

      <!-- Column 2: Instructions -->
      <section>
        <div style="border-bottom: 1.5px solid #242423; padding-bottom: 4px; margin-bottom: 10px;">
          <h2 style="font-family: Georgia, serif; font-size: 1.25em; margin: 0; color: #242423;">
            Preparation Steps
          </h2>
        </div>
        ${instructionsHtml}
      </section>
    </div>

    <!-- Nutritional Breakdown -->
    ${nutritionSectionHtml}

    <!-- Halal Guarantee Note -->
    ${halalNotesHtml}

    <!-- Print Footer -->
    <footer style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #E0DCD5; display: flex; justify-content: space-between; font-size: 0.75em; color: #8A857E;">
      <span>Printed from Noakhali Kitchen &bull; https://noakhalikitchen.com/recipes/${recipe.slug}</span>
      <span>${new Date().toLocaleDateString(undefined, { dateStyle: "medium" })}</span>
    </footer>
  </main>

  <script>
    // Auto-trigger browser print when opened directly
    window.addEventListener('load', function() {
      setTimeout(function() {
        try {
          window.focus();
          window.print();
        } catch (e) {
          console.log('Auto print prevented by browser', e);
        }
      }, 300);
    });
  </script>
</body>
</html>`;
}

/**
 * Checks if the current window is running inside an iframe (e.g. AI Studio preview).
 */
export function isRunningInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

/**
 * Opens the recipe in a brand-new top-level browser tab using a Blob URL.
 * Top-level browser tabs are NEVER blocked by iframe sandbox restrictions!
 */
export function openPrintWindow(
  recipe: Recipe,
  options: PrintOptions = {}
): void {
  const htmlContent = generatePrintableHtml(recipe, options);
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);

  // Try standard window.open
  const newWin = window.open(blobUrl, "_blank");

  // Fallback: create temporary anchor link and click it (handles popup blockers better)
  if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  // Clean up object URL after 60 seconds
  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 60000);
}

/**
 * Directly downloads the styled, print-friendly recipe HTML file to disk.
 * The user can open it in any browser and print or save to PDF.
 */
export function downloadPrintableHtml(
  recipe: Recipe,
  options: PrintOptions = {}
): void {
  const htmlContent = generatePrintableHtml(recipe, options);
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = `${recipe.slug}-halal-recipe-print.html`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 30000);
}

/**
 * Executes a resilient print routine:
 * 1. Tries window.focus() and window.print() inside try/catch.
 * 2. If in an iframe or if window.print is blocked / fails, opens in a new tab or prompts fallback.
 */
export function triggerBrowserPrint(
  recipe: Recipe,
  options: PrintOptions = {}
): { success: boolean; openedNewTab: boolean } {
  const inIframe = isRunningInIframe();

  // If in an iframe, window.print() is often blocked by Chrome iframe sandbox without allow-modals.
  // We first try window.print(), but if in an iframe, we ALSO provide or open in a new tab!
  let printed = false;
  try {
    window.focus();
    window.print();
    printed = true;
  } catch (err) {
    console.warn("Direct window.print() encountered an error:", err);
  }

  // If we are in an iframe, direct window.print() is almost always suppressed silently by browser sandbox.
  // Open the print tab so the user gets their actual print dialog!
  if (inIframe) {
    openPrintWindow(recipe, options);
    return { success: true, openedNewTab: true };
  }

  return { success: printed, openedNewTab: false };
}
