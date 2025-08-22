import { template } from "./template.js";
import { generatePriceCards } from "./generator.js";

document.querySelector("#component").innerHTML = template;
document.querySelector("#price-table").innerHTML = generatePriceCards();
