const myURL = new URL("https://example.com/student?name=John&roll=101");

console.log("URL:", myURL.href);
console.log("Name:", myURL.searchParams.get("name"));
console.log("Roll No:", myURL.searchParams.get("roll"));

myURL.searchParams.set("roll", "102");

console.log("Updated URL:", myURL.href);