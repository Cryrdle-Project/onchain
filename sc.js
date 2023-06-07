// const coinMarketCapRequest = fetch(
// 	`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1`,
// 	{
// 	  headers: { "X-CMC_PRO_API_KEY": "1932ede2-c5eb-433a-8662-0023b3144390" },
// 	}
//   );

//   coinMarketCapRequest
// 	.then((response) => {
// 	  if (!response.ok) {
// 		throw new Error('Request failed');
// 	  }

// 	// resp = response.json();

// 	// const obj = JSON.parse(resp);
// 	// const name = ;

// 	console.dir(response);
// 	//   const jsonString = JSON.stringify(resp);
// 	// //   const buffer = Buffer.from(jsonString, 'utf8'); // Node.js
// 	return response.json();
// 	})
// 	.then((data) => {
// 	//   const jsonString = JSON.stringify(data);
// 	// const cryptocurrency = Object.values(data.data)[0];
// 	// const name = cryptocurrency.name;
// 	console.log(data.data['1'].name);
// 	})
// 	.catch((error) => {
// 	  console.error('Error:', error.message);
// 	});

function hexToText(hexString) {
  // Remove any whitespace or special characters from the input string
  hexString = hexString.replace(/\s/g, "")

  // Split the input string into pairs of two characters
  const hexPairs = hexString.match(/.{1,2}/g)

  // Convert each pair of hexadecimal digits to its corresponding character
  const textArray = hexPairs.map((hex) => String.fromCharCode(parseInt(hex, 16)))

  // Join the characters together to form the final text string
  const textString = textArray.join("")

  return textString
}

// Example usage
const hexString = "0x426974636f696e" // Hexadecimal representation of "Bitcoin"
const text = hexToText(hexString)

console.log(text) // Output: "Bitcoin"
