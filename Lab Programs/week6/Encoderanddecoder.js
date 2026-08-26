const encoder = new TextEncoder();
const decoder = new TextDecoder();
let text = "Govi";
let encoded = encoder.encode(text);
console.log("Original Text:", text);
console.log("Encoded Data:", encoded);
let decoded = decoder.decode(encoded);
console.log("Decoded Text:", decoded);