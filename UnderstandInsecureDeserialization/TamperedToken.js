const base64Header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"; // This is the Base64Url encoded header from the original token
const signature = "S-VVeF73uzem6yjL7s3870XKqQmjEvUWZj1ppMi10YE"; // You can use the original signature (it will be invalid if changed)
const base64Payload = "eyJ1c2VySWQiOjEyMywicm9sZSI6ImFkbWluIiwiY2FydEl0ZW1zIjpbeyJwcm9kdWN0SWQiOjEsInF1YW50aXR5IjoyfSx7InByb2R1Y3RJZCI6MiwicXVhbnRpdHkiOjF9XSwiaWF0IjoxNzMwMTcyNDAyLCJleHAiOjE3MzAxNzYwMDJ9"; // This is the Base64Url encoded payload from the modified token
const tamperedToken = `${base64Header}.${base64Payload}.${signature}`;
console.log("Tampered Token:", tamperedToken);
