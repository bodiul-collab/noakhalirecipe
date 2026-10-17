import { Recipe } from "../types";

export interface PrintableRecipeOptions {
  multiplier?: number;
  includeNutrition?: boolean;
  includeChefNotes?: boolean;
  includeTips?: boolean;
}

export function generatePrintableHtml(recipe: Recipe, options: PrintableRecipeOptions = {}): string {
  const mult = options.multiplier || 1;
  const scaledServings = Math.round(recipe.servings * mult);

  const scaledIngredients = recipe.ingredients
    .map((i) => {
      const num = parseFloat(i.amount);
      const scaledAmount = isNaN(num)
        ? i.amount
        : (num * mult) % 1 === 0
        ? (num * mult).toString()
        : (num * mult).toFixed(1);
      return `<li><strong>${scaledAmount} ${i.unit || ""}</strong> ${i.name} ${i.notes ? `<em>(${i.notes})</em>` : ""}</li>`;
    })
    .join("\n");

  const instructionsHtml = recipe.instructions
    .map(
      (inst, idx) => `
    <div style="margin-bottom: 14px;">
      <h4 style="margin: 0 0 4px 0; font-size: 14px; color: #242423;">Step ${idx + 1}: ${inst.title}</h4>
      <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #4D4943;">${inst.instruction}</p>
    </div>
  `
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${recipe.title} - Noakhali Kitchen</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #242423; margin: 40px; }
    h1 { font-size: 26px; text-transform: uppercase; margin-bottom: 4px; }
    .branding { font-size: 20px; font-weight: bold; border-bottom: 2px solid #242423; padding-bottom: 8px; margin-bottom: 16px; display: flex; justify-content: space-between; }
    .meta { font-size: 12px; color: #77736D; margin-bottom: 16px; }
    .grid { display: grid; grid-template-columns: 1fr 2fr; gap: 24px; }
    ul { padding-left: 20px; font-size: 13px; line-height: 1.6; }
    @media print { body { margin: 15mm; } button { display: none; } }
  </style>
</head>
<body>
  <div class="branding">
    <div>
      <div>Noakhali Kitchen</div>
      <div style="font-size: 12px; font-weight: normal; color: #77736D;">https://www.noakhalikitchen.com/recipes/${recipe.slug}</div>
    </div>
    <div style="text-align: right; font-size: 12px; color: #2D7A52; font-weight: bold;">
      100% Halal Verified
    </div>
  </div>
  <h1>${recipe.title}</h1>
  <div class="meta">
    Category: ${recipe.category} • Cuisine: ${recipe.cuisine} • Servings: ${scaledServings} • Prep: ${recipe.prepTimeMinutes}m • Cook: ${recipe.cookTimeMinutes}m • Total: ${recipe.totalTimeMinutes}m
  </div>
  <p style="font-size: 14px; line-height: 1.5; color: #4D4943;">${recipe.description}</p>
  <div class="grid">
    <div>
      <h3 style="border-bottom: 1px solid #E6E1D8; padding-bottom: 6px;">Ingredients</h3>
      <ul>${scaledIngredients}</ul>
    </div>
    <div>
      <h3 style="border-bottom: 1px solid #E6E1D8; padding-bottom: 6px;">Instructions</h3>
      ${instructionsHtml}
    </div>
  </div>
</body>
</html>`;
}

export function openPrintWindow(recipe: Recipe, options: PrintableRecipeOptions = {}): void {
  if (typeof window === "undefined") return;
  const html = generatePrintableHtml(recipe, options);
  const win = window.open("", "_blank");
  if (win) {
    win.document.open();
    win.document.write(html);
    win.document.close();
    setTimeout(() => {
      win.focus();
      win.print();
    }, 500);
  } else {
    window.print();
  }
}

export function downloadPrintableHtml(recipe: Recipe, options: PrintableRecipeOptions = {}): void {
  if (typeof window === "undefined") return;
  const html = generatePrintableHtml(recipe, options);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${recipe.slug}-noakhali-kitchen.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
