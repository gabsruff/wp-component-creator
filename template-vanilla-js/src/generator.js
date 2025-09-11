import data from "./prices.json";
import styles from "./styles.module.css";

export function generatePriceCards() {
  return data
    .map(
      (plan) => `
    <div class="${styles.card}">
      <div class="${styles.title}">${plan.title}</div>
      <div class="${styles.price}">${plan.price}</div>
      <div class="${styles.features}">
        ${plan.features
          .map((f) => `<p class="${styles.feature}">${f}</p>`)
          .join("")}
      </div>
    </div>
  `
    )
    .join("");
}
