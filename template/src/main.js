const root = document.getElementById(import.meta.env.VITE_COMPONENT_SLUG); // ID shared by both live-server and wp-shortcode parent elements.
//Edit below

import { template } from "./template.js";
import { generatePriceCards } from "./generator.js";

root.innerHTML = template;
document.querySelector("#price-table").innerHTML = generatePriceCards();
